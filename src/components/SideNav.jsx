import * as FaIcons from 'react-icons/fa';
import * as RxIcons from 'react-icons/rx';

export const SideNav = [
    {
        label: "Dashboard",
        icon: <RxIcons.RxDashboard />,
        key: '/'
    },
    {
        label: "User",
        icon: <FaIcons.FaUserCog />,
        key: '/user-data'
    },
    {
        label: "Employee",
        icon: <FaIcons.FaUsers />,
        key: '/employee-data'
    }
]