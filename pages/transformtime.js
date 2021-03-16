// 将时间换算成正常时间
function gettime(date,param){
    let y=date.getFullYear()
    let m=(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let d=(date.getDate()<10? '0'+ date.getDate() + ' ':date.getDate() + ' ');
    let h=(date.getHours() <10? '0'+date.getHours()+':':date.getHours()+':');
    let s=(date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes());
    const longtime=m+d+""+h+s
    if(param=="noday")
    return " "+h+s
    else if(param=="haveyear")
    return y+"-"+longtime
    else
    {
      return longtime
    }
  }
//  时间转换函数
function utime(time){
    let date=new Date(time)
    let nowtime=new Date()
    let day=date.getDate()
    let nowday=nowtime.getDate()

        // 获取当前时间和服务器时间的相差秒
    let ssecond=parseInt((nowtime.getTime()-date.getTime())/1000)
    // 如果当前时间和服务器时间相差不到一年
    if(nowtime.getFullYear()-date.getFullYear()==0)
    {
        // 相差不到一个月
        if(nowtime.getMonth()-date.getMonth()==0)
        {
            
            // 今天
            if(nowday-day==0)
            {
                if(ssecond<60)
                {
                    return "刚刚"
                }
                else if(ssecond/60<60)
                {
                    return parseInt(ssecond/60)+"分钟前"
                }
                else if(parseInt(ssecond/(60*60))<=2)
                return parseInt(ssecond/(60*60))+"小时前"
                else
                return "今天"+gettime(date,"noday")

            }
            // 昨天
            else if(nowday-day==1)
            {
                return "昨天"+gettime(date,"noday")
            }
            // 前天
            else if(nowday-day==2)
            {
                return "前天"+gettime(date,"noday")
            }
            else{
                return gettime(date)
            }
        }
        else
        {
            return gettime(date)
        }    
    }
    else
    return  gettime(date,"haveyear")
}

export default utime;