const express=require('express');
const {ECSClient,RunTaskCommand} = require('@aws-sdk/client-ecs')
const {Server}=require('socket.io');
const Redis=require('ioredis')
const cors = require('cors');

const app=express();

const PORT=9000;

const subscriber= new Redis('rediss://default:AVNS_8miwqWZrF_y4AvWsgf5@redis-1cc03f47-priyanshu-35b1.e.aivencloud.com:23963');

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
    CLUSTER:'arn:aws:ecs:ap-south-1:891376970589:cluster/hackup-cluster',
    TASK:'arn:aws:ecs:ap-south-1:891376970589:task-definition/builder-task-1'
}

app.use(express.json())
app.use(cors());

app.post('/project',async(req,res)=>{
    //const {gitURL,slug}=req.body
    const gitURL="https://github.com/tripathi08/sample"
    const projectSlug="p50";

    const command=new RunTaskCommand({
        cluster:config.CLUSTER,
        taskDefinition:config.TASK,
        launchType:'FARGATE',
        count:1,
        networkConfiguration:{
            awsvpcConfiguration:{
                assignPublicIp:'ENABLED',
                subnets:['subnet-0b908ee369ef5f844','subnet-0f5339ee65bc49a34','subnet-0cfbf2bd020779948'],
                securityGroups:['sg-0bb735841e542c1bc']
            }
        },
        overrides:{
            containerOverrides:[
                {
                    name:'builder-image',
                    environment:[
                        {name:'GIT_REPOSITORY__URL',value:gitURL},
                        {name:'PROJECT_ID',value:projectSlug}
                    ]
                }
            ]
        }
    })
    await ecsClient.send(command);

    return res.json({status:'queued',data:{projectSlug,url:`http://${projectSlug}.localhost:8000`}})
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