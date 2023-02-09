import * as ImIcons from 'react-icons/im';
import * as FaIcons from 'react-icons/fa';

export const SideNav = [
    {
        label: "Home",
        icon: <ImIcons.ImHome />,
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