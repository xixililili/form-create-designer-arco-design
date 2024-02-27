import {createApp} from 'vue';
import ELEMENT from 'element-plus';
import 'element-plus/dist/index.css';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import formCreate from '@form-create/arco-design';
import App from './App.vue';
import FcDesigner from '../src/index';

const app = createApp(App);

app.use(ELEMENT);
app.use(ArcoVue);
app.use(formCreate);
app.use(FcDesigner);


app.mount('#app')
