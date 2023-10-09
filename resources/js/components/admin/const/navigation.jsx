import React from 'react'
import { HiOutlineCube, HiOutlineCog, HiOutlineQuestionMarkCircle, HiOutlineViewGrid} from 'react-icons/hi'




export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: "settings",
        label: "Settings",
        path: '/',
        icon: <HiOutlineCog />
    },
    {
        key:'support',
        label:'Help and Support',
        path: '/',
        icon: <HiOutlineQuestionMarkCircle/>
    }
]

