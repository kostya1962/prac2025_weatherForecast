import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App); //создание основного компонента приложения - App
app.directive('focus', { // определение катомной директивы, которая будет дейтсоввать во всем приложении (нужна для фокусировки на элементе при его появлении в DOM)
    mounted: (el) => el.focus(),
});
app.mount('#app'); // интеграция компонента App.vue в элемент с идентификатором app 
