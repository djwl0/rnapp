import cors from 'cors'
import express from 'express'
import mysql from 'mysql'


const app=express();
app.use(cors())    //设置跨域
app.listen(8099,()=>{console.log("服务开启")})

// mysql环境设置
const option={
    host:'rm-2ze0zqv1pw5ouo2s9co.mysql.rds.aliyuncs.com',
    user:'root',
    password:'Huo1602951127',
    database:'my-rnapp'
}
const conn=mysql.createConnection(option)

app.get('/getcomments',(req,res)=>{
    conn.query('select * from allcomments left join alluser on allcomments.userid=alluser.userid order by commentid desc',(err,result)=>{
    res.json(result)
    })
})

app.get('/insertcomments',(req,res)=>{
  
	console.log(req.query)
    conn.query("insert into allcomments (main,userid)values( ? , ?)",[req.query.main,req.query.userid],(err,result)=>{
    // res.json(result)
	if(err)
	{
		res.send("-1")
	}
	else{
		res.send("1")
	}
    })
})
// 登录
app.get('/login',(req,res)=>{
    console.log(req.query)
    conn.query("select * from alluser where useraccount= ? and userpwd= ?",[req.query.account,req.query.pwd],(err,result)=>{
        res.json(result)
    })
})
// 获取一句话的所有评论
app.get('/gettalk',(req,res)=>{
    // console.log(req.query)
    conn.query("select * from alluser inner join talks on talks.userid=alluser.userid where  talks.commentid= ? order by talkid desc",req.query.commentid,(err,result)=>{
        res.json(result)
    })

})
// 添加评论
app.get('/inserttalk',(req,res)=>{
    conn.query("insert into talks (commentid,userid,maintalk)values(?,?,?)",
    [req.query.commentid,req.query.userid,req.query.maintalk],(err,result)=>{
        if(err)
	{
		res.send("-1")
	}
	else
	{
		conn.query("update allcomments set talkcount=talkcount+1 where commentid=?",req.query.commentid,(err,result)=>{
			if(err)
			{
				res.send("-1")
			}
			else
			{
				res.send('1')
			}
		})
	}

    })

})

// 点赞
app.get('/commentlike',(req,res)=>{
	// res.send('1')

	conn.query("insert into commentslike values(?,?)",[req.query.commentid,req.query.userid],(err,result)=>{
		if(err)
		{
			res.send("-1")
		}
		else
		{
			conn.query("update allcomments set likecount=likecount+1 where commentid=?",req.query.commentid,(err,result)=>{
				if(err)
				{
					res.send("-1")
				}
				else
				{
					res.send("成功")
				}
			})
		}
		
	})
})
app.get('/getuserlike',(req,res)=>{
	conn.query("select * from commentslike where userid=?",req.query.userid,(err,result)=>{
		res.json(result)
	})

})
