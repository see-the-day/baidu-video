const MENUCONST = (name: string): string => {
  const obj = {
    market: 'icon-icon_shichangdongcha_xuanzhong',
    'market-default': 'icon-icon_shichangdongcha_weixuanzhong',
  }
  return obj[name]
}

export default MENUCONST
