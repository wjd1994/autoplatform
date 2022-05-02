import MainMenu from '../components/Menu/MainMenu.vue'
import IndexPage from '../components/Pages/index/index.vue'
import ToolPage1 from '../components/Pages/tools/tool1.vue'
import ToolPage2 from '../components/Pages/tools/tool2.vue'

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
      }
]
export default routes