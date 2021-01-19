export default [
    {
        path: '/',
        redirect: '/ui/dashboard',
    },
    {
        path: '/ui/login',
        name: 'Login',
        component: () => import('../../vue/ui/LoginVue'),
    },
    {
        path: '/ui',
        name: 'UI',
        component: () => import('../../vue/ui/CRM'),
        children: [
            {
                path: '/ui/dashboard',
                name: 'Dashboard',
                components: {
                    content: () => import ('../../vue/ui/pages/Dashboard')
                },
                meta: {
                    icon: 'mdi-chart-donut',
                    list_in_nav: true
                }
            },
            {
                path: '/ui/bt-withdraw',
                name: 'BTWithdraw',
                components: {
                    content: () => import ('../../vue/ui/pages/BTWithdraw')
                },
                meta: {
                    icon: 'mdi-chemical-weapon',
                    list_in_nav: true
                }
            }
        ]
    }
];
