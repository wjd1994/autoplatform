import MainMenu from '../components/Menu/MainMenu.vue'
import IndexPage from '../components/Pages/index/index.vue'
import ToolPage1 from '../components/Pages/tools/tool1.vue'
import ToolPage2 from '../components/Pages/tools/tool2.vue'
// import CaseManage from '../components/Pages/autotestmanage/casemanage.vue'

const routes=[
    {
        path: '/',
        component: MainMenu,
        children: [
            {
              path: 'index',
              name: 'index',
              meta:{title: '首页',index:0},
              component:  IndexPage
            }
          ]
      },
      {
        path: '/tool/',
        name: '',
        meta:{title: '一级菜单',index:1},
        component: MainMenu,
        children: [
          {
            path: 'tool',
            name: 'tool',
            meta:{title: '一级菜单',index:1},
            component:  ToolPage1
          },
            {
              path: 'tool1',
              name: 'tool1',
              meta:{title: '权限管理',index:1},
              component:  ToolPage1
            },
            {
              path: 'tool2',
              name: 'tool2',
              meta:{title: '角色管理',index:1},
              component:  ToolPage2
            }
          ]
      },
      {
        path:'/autotestmanage/',
        name:'autotestmanage',
        meta:{title:'自动化管理', index:2},
        component: MainMenu,
        children:[
          {
            path:'casemanage',
            name:'casemanage',
            meta:{title:'用例管理', index:2},
            // component: CaseManage
            component: ()=>import('../components/Pages/autotestmanage/casemanage.vue')
          },
          {
            path:'caseedit',
            name:'caseedit',
            meta:{title:'用例编写', index:2},
            // component: CaseManage
            component: ()=>import('../components/Pages/autotestmanage/caseedit.vue')
          }
        ]
      }
]
export default routes