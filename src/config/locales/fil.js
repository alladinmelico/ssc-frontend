import { defineMessages } from 'react-intl'

const messages = defineMessages({
  app_name: 'React Most Wanted',
  sign_in: 'Mag-sign in',
  sign_out: 'Mag-sign out',
  sign_up: 'Mag-sign up',
  email: 'Email',
  username: 'Username',
  // deepcode ignore NoHardcodedPasswords: intended
  password: 'Password',
  about: 'Tungkol sa',
  home: 'Unang Pahina',
  page_not_found: 'Hindi nahanap ang pahina',
  settings: 'Mga setting',
  theme: 'Tema',
  default: 'Default',
  red: 'Pula',
  green: 'Berde',
  language: 'Wika',
  en: 'Ingles',
  de: 'Aleman',
  ru: 'Ruso',
  fil: 'Tagalog',
  menu: 'Mga nilalaman',
  menu_mini_mode: 'Maliit na bersyon ng nilalaman',
  offline: 'Hindi actibo',
  demos: 'Pagpapakita',
  dialog_demo: 'Pagpapakita ng diyalogo',
  dialog_title: 'Pamagat ng diyalogo',
  dialog_action: 'Oo, Tanggalin',
  dialog_message: `Mensahe ng diyalogo. Maaari kang maglagay ng maraming teksto hangga't gusto mo dito.
  Magtanong o magpakita ng babala bago magtanggal ng isang bagay. 
  Maaari mo ring itakda ang teksto ng aksyon sa isang bagay tulad ng "OO, Tanggalin" at patakbuhin ang pagkilos na iyon sa pamamagitan ng pagpasa ng prop na "handleAction."
  Nakatanggap ito ng callback na "handleClose" kung saan maaari mong isara ang diyalogo kapag tapos na ang iyong aksyon.`,
  toast_demo: 'Pagpapakita ng toast',
  filter_demo: 'Pagpapakita ng piltro',
  list_page_demo: 'Demo ng Listahan ng Pahina na may {count} mga hilera',
  forgot_password: 'Nakalimutan ang password',
  password_reset: 'Pag-reset ng password',
  password_confirm: 'Kumpirmahin ang password',
  registration: 'Pagpaparehistro',
  my_account: 'Aking Account',
  delete_account_dialog_title: 'Tanggalin ang Account?',
  delete_account_dialog_message:
    'Ang iyong account ay tatanggalin at mawawala ang lahat ng iyong data!',
  delete_account_dialog_action: 'Tanggalin ang account',
})

export default messages