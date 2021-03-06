import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import fetch from '../../utils/request'
import classNames from 'classnames'

import { saveVideoId } from '../../actions'

class VideoDetail extends React.Component {
  addLike = async (e, id) => {
    e.preventDefault()
    await fetch.put(`/video/like`, { id })
  }

  goToWeiChatPay = () => {
    // 判断这个该用户是否先前看过这个视频
    if(window.localStorage.getItem('userVideo')) {
      let userInfo = JSON.parse(window.localStorage.getItem('userVideo'))
      let { viewedList } = userInfo
      let timestamp = Date.parse(new Date());
      let finalArr = viewedList.filter((item) => {
        // eslint-disable-next-line
        if(item.videoId == this.props.videoItem.id && timestamp < item.validityPeriod) {
          return true
        }else{
          return false
        }
      })

      if(finalArr.length > 0) {
        this.props.history.push(`/play/${this.props.videoItem.id}`)
      }else{
        this.props.saveVideoId(this.props.videoItem)
        this.props.history.push(`/weiChatPay`)
      }
    }else{
      this.props.saveVideoId(this.props.videoItem)
      this.props.history.push(`/weiChatPay`)
    }
  }

  directlyInterVideo = () => {
    this.props.history.push(`/play/${this.props.videoItem.id}`)
  }

  render() {
    const { videoItem } = this.props

    const { id, views, likes, duration, videoDesc, imgUrl, price } = videoItem

    let isViewed = false;

    if(window.localStorage.getItem('userVideo')) {
      let userInfo = JSON.parse(window.localStorage.getItem('userVideo'))
      let { viewedList } = userInfo
      let timestamp = Date.parse(new Date());
      let finalArr = viewedList.filter((item) => {
        // eslint-disable-next-line
        if(item.videoId == this.props.videoItem.id && timestamp < item.validityPeriod) {
          return true
        }else{
          return false
        }
      })

      if (finalArr.length > 0) {
        isViewed = true
      }
    }

    return (
      <div className="positionRelative videoWrapper" key={id}>
        <div
          style={{ marginTop: '20px' }}
          className="positionRelative singleVideo"
        >
          {/* <img className="videoThumb" src={`${baseUrl}/${imgUrl}`} alt="" /> */}
          {/* <img className="videoThumb" src={`https://videodelivery.net/${imgUrl}/thumbnails/thumbnail.gif?time=5s&duration=3s&height=150&fps=1`} alt="" /> */}
          {/* <img className="videoThumb" src={`${baseUrl}/${imgUrl}.gif`} alt="" /> */}
          <img className="videoThumb" src={`https://raw.githubusercontent.com/ImagesLove/Images/master/${imgUrl}.gif`} alt=""></img>

          <div className="duration thumbOverlay hideInUserStream">
            <span className="hd-thumbnail">HD</span>
            <span className="time">{duration}</span>
          </div>
        </div>

        <div className="underThumb positionRelative clearfix">
          <div className="title">
            <span>{videoDesc}</span>
          </div>

          <div className="views">{(views / 1000).toFixed(1)}K 浏览</div>

          <div
            className="rating up like-wrap"
            onClick={event => this.addLike(event, id)}
          >
            <i />
            <span>{((likes / views) * 100).toFixed(0)}%</span>
          </div>

          <div
            className="price-cankao"
          >
            <span className="pay2Download"></span>
            <span className="price-span">参考价:{price} &yen;</span>
          </div>

          <div
            className="channel-icon"
            onClick={
              Number(id) < 3 ? this.directlyInterVideo : this.goToWeiChatPay
            }
          >
            <i className="producer-icon video-sprite"></i>
            <span> {
              isViewed
             ? <span style={{ color: 'green' }}>进行回看</span> :
              <span>立即观看</span>
            } </span>
          </div>

          <div className="duration thumbOverlay inUserStream hidden">
            <span className="hd-thumbnail">HD</span>
            <span className="time">{duration}</span>
          </div>
        </div>

        <span
          className={classNames({
            'on-course-card': true,
            badge: true,
            'badge-accented': true,
            coral: true,
            xianmian: Number(id) < 3
          })}
        >
          <span className="badge-text">限免 hot &amp; New</span>
        </span>
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    {
      saveVideoId
    }
  )(VideoDetail)
)
