import { Profile, Help, Settings } from "."

export const ActiveMenuItem = ({activeMenuItem}: any) => {
  if(activeMenuItem === 'profile') {
    return <Profile></Profile>
  }else if(activeMenuItem === 'help') {
    return <Help></Help>
  }else if(activeMenuItem === 'settings') {
    return <Settings></Settings>
  }else {
    return <div></div>
  }
}
