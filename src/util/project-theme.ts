import { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#F04848',
    primaryColorHover: 'rgb(234, 65, 72)',
    primaryColorPressed: '#F04848',
    primaryColorSuppl: '#F04848',
    textColor1: '#242426',
    textColor2: '#242426',
    textColor3: '#242426',
    placeholderColor: '#84868C'
  },
  Button: {
    textColor: '#242426'
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: '#F04848'
      }
    }
  }
}

export default themeOverrides
