# ijtimoiy tarmoq frontend 
Doston Sheraliyev

ushbu sayt foydalanuvchilar aro muloqot qilish, statuslarni ommaga e'lon qilish
muhokamalar uyushtirish,like tugmalarini bosish,shaxsiy yozishmalar yozish
va boshqa bir qator hususiyatlarni o'z ichiga oladi.
ushbu qismda loyihaning frontend ya'ni clinet qismi bilan tanishib chiqish mumkin.

saytga o'tish uchun: https://www.com/
 
loyihaning client qismi to'liq SOLID tamoillari asosida ishlab chiqilgan.
Loyihada ushbu tamoillarga muvofiq UI,BIZNES,DAL qismlarga ajratilgan. React js kutibxonasidan foydalanilgan.
UI qismida reactJS ning funksional komponentlari va hooklar qulayliklaridan foydalanilgan.
LifeCylelar o'rniga useEffectlardan foydalanilgan.
BIZNES qismi uchun redux kutibxonisining maxsus qismi redux-toolkit state menegeridan foydalanilgan.
Data access layer uchun serverga sorov yuboruvchi alohida obyektlardan tashkil topgan qism yozib chiqilgan va u 
UI hamda BIZNES qismidan mustaqil ravishda joylashgan.
Shuningdek real timeda yozishlamar almashish , foydalnuvchining saytfa tashrif buyurganini bildirish,
umumiy chat orqali barcha foydalanuvchilar bir vaqtda muloqot qilishlari uchun chat yo'lga qo'yish uchun
Socket.IO kutibxonasidan foydalanilgan va ushbu kutibxonani solid tamoillariga monand ishlatish uchun unga socketIo-redux0middleware yordamchi tarzida ishlab chiqilgan.


## bartaraf etilishi ko'zda tutilgan qismlar

loyihaning porformance optimallashuviga e'tibor berish.
kodlardagi birxilliklarni (дублирование) bartaraf etish uchun optimizatsityani amalga oshirish.
saytning responsivligi va adaptivligini ishlab chiqish.
Animatsiyalar joriy etish.Hali ishlab chiqilmagan saytning boshqa imkoniyatlarini rejadagidek ishlab chiqish.
haqiqiy elektron pochta nomiga rasmiylashtirishni yo'lga qo'yish.
WebPack yig'uvchisi hizmatidan foydalanish.
Reducerlardagi birxilliklarni opmtillashtirish

## foydalanilgan uskunalar

### `materila UI ract`
### `reduxjs/toolkit`
### `redux-socket.io`
### `socket.io-client`
### `axios`
### `dateformat`
### `emoji-picker-react`
### `formik`
### `react-image-lightbox`
### `react-infinite-scroll-component`
### `react-redux`
### `react-router-dom`
### `react-viewer`
### `timeago-react`
### `timeago.js`