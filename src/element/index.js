import Vue from "vue"
import 'element-ui/lib/theme-chalk/index.css';
import {
    Container,
    Header,
    Main,
    Form,
    FormItem,
    Input,
    Button,
    Dialog,
    Message,
    Aside,
    Row,
    Col,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Table,
    TableColumn,
    Pagination
} from "element-ui"

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Aside)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)


Vue.prototype.$message=Message