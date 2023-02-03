import { nextTick } from 'vue'
import { Parser, Player, VideoEntity } from 'svgaplayerweb'

const trapezoidBox = () => {
  const player = new Player('#loading-child-box')
  const parser = new Parser()
  parser.load('/loading.svga', function (videoItem: VideoEntity) {
    player.setVideoItem(videoItem)
    player.startAnimation()
  })
}

let isCreateLoading = true
const create = (): void => {
  if (!isCreateLoading) {
    return
  }
  isCreateLoading = false
  nextTick(() => {
    const div = document.createElement('div')
    document.body.style.overflow = 'hidden'
    div.id = 'loading-box'
    div.style.position = 'fixed'
    div.style.top = '0'
    div.style.bottom = '0'
    div.style.left = '0'
    div.style.right = '0'
    div.style.background = 'rgb(255,255,255,.3)'
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.justifyContent = 'center'
    div.style.flexDirection = 'column'
    div.style.transition = 'opacity .3s'
    div.style.zIndex = '9999'

    const box = document.createElement('div')
    box.id = 'loading-child-box'
    box.style.width = '60px'
    box.style.height = '60px'

    const span = document.createElement('div')
    span.innerText = 'Loading...'
    span.style.lineHeight = '20px'
    span.style.marginTop = '4px'
    span.style.color = '#F04848'

    const shadowBox = document.createElement('div')
    shadowBox.style.width = '120px'
    shadowBox.style.height = '120px'
    shadowBox.style.display = 'flex'
    shadowBox.style.alignItems = 'center'
    shadowBox.style.paddingTop = '16px'
    shadowBox.style.flexDirection = 'column'
    shadowBox.style.background = '#fff'
    shadowBox.style.borderRadius = '4px'
    shadowBox.style.boxShadow = '0px 0px 10px #EBEBEB'

    shadowBox.appendChild(box)
    shadowBox.appendChild(span)
    div.appendChild(shadowBox)
    const bo: HTMLElement = document.querySelector('#app') as HTMLElement
    bo.insertBefore(div, bo.lastChild)
    trapezoidBox()
  })
}

const close = (): void => {
  const loadingDiv = document.querySelector('#loading-box')
  document.body.removeAttribute('style')
  if (loadingDiv) {
    ;(document.querySelector('#app') as HTMLElement).removeChild(loadingDiv)
    isCreateLoading = true
  }
}
const loading = {
  create,
  close
}

export default loading
