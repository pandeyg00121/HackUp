const express=require('express');
const {ECSClient,RunTaskCommand} = require('@aws-sdk/client-ecs')
const {Server}=require('socket.io');
const Redis=require('ioredis')
const { z } = require('zod')
const { PrismaClient } = require('@prisma/client')

const app=express();

const PORT=9000;

const subscriber= new Redis('rediss://default:AVNS_8miwqWZrF_y4AvWsgf5@redis-1cc03f47-priyanshu-35b1.e.aivencloud.com:23963');

const prisma = new PrismaClient({})

const io=new Server({cors:'*'})

io.on('connection', socket=>{
    socket.on('subscribe',channel=>{
        socket.join(channel);
        socket.emit('message',`Joined ${channel}`)
    })
})

io.listen(9002,()=>console.log(`Socket Server 9002`))

const ecsClient=new ECSClient({
    region:'ap-south-1',
    credentials:{
        accessKeyId:'AKIA47CRVFNO6QKMGHOK',
        secretAccessKey: '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'
    }
});

const config={
    CLUSTER:'arn:aws:ecs:ap-south-1:891376970589:cluster/hackup-builder-cluster',
    TASK:'arn:aws:ecs:ap-south-1:891376970589:task-definition/builder-task'
}

app.use(express.json())

app.post('/project', async (req, res) => {
    const schema = z.object({
        name: z.string(),
        gitURL: z.string()
    })
    const safeParseResult = schema.safeParse(req.body)

    if (safeParseResult.error) return res.status(400).json({ error: safeParseResult.error })

    const { name, gitURL } = safeParseResult.data

    const project = await prisma.project.create({
        data: {
            name,
            gitURL,
            subDomain: generateSlug()
        }
    })

    return res.json({ status: 'success', data: { project } })

})

app.post('/deploy', async (req, res) => {
    const { projectId } = req.body

    const project = await prisma.project.findUnique({ where: { id: projectId } })

    if (!project) return res.status(404).json({ error: 'Project not found' })

    // Check if there is no running deployement
    const deployment = await prisma.deployement.create({
        data: {
            project: { connect: { id: projectId } },
            status: 'QUEUED',
        }
    })

    // Spin the container
    const command = new RunTaskCommand({
        cluster: config.CLUSTER,
        taskDefinition: config.TASK,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: 'ENABLED',
                subnets: ['subnet-0c364045c881f1aad', 'subnet-0b70fd02fcb7a6d19', 'subnet-0c1ddfb525fdc0198'],
                securityGroups: ['sg-0f68ac449a85ac7f6']
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: 'build-server-img',
                    environment: [
                        { name: 'GIT_REPOSITORY__URL', value: project.gitURL },
                        { name: 'PROJECT_ID', value: projectId },
                        { name: 'DEPLOYEMENT_ID', value: deployment.id },
                    ]
                }
            ]
        }
    })

    await ecsClient.send(command);

    return res.json({ status: 'queued', data: { deploymentId: deployment.id } })

})


async function initRedisSubscribe(){
    console.log('Subscribed to logs...');
    subscriber.psubscribe('logs:*')
    subscriber.on('pmessage',(pattern,channel,message)=>{
        io.to(channel).emit('message',message)
    })
}

initRedisSubscribe();

app.listen(PORT,()=>console.log(`API Server Running... ${PORT}`))