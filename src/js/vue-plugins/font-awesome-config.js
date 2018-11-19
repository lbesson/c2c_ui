
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

import {
    faCloud,
    faSun,

    faAngleDown,
    faArrowsAltV,
    faArrowRight,
    faAt,
    faAtlas,
    faBan,
    faBars,
    faBold,
    faBomb,
    faBug,
    faBullseye,
    faCamera,
    faCheckCircle,
//    faCheckSquare,
    faChevronLeft,
    faChevronRight,
    faCircle,
    faCode,
    faCogs,
    faColumns,
    faComment,
    faComments,
    faCompass,
    faCompress,
    faDatabase,
    faEdit,
    faExpand,
    faEye,
    faFlag,
    faFlagCheckered,
    faGlobeAmericas,
    faGrin,
    faHashtag,
    faHeading,
    faHeart,
    faHistory,
    faHome,
    faImage,
    faInfo,
    faInfoCircle,
    faItalic,
    faKey,
    faLayerGroup,
    faLink,
    faList,
    faListOl,
    faListUl,
    faLock,
    faMap,
    faMapMarkedAlt,
    faMapPin,
    faMinus,
    faNewspaper,
    faObjectGroup,
    faPen,
    faPlus,
    faPlusCircle,
    faQuestionCircle,
    faRoute,
    faSearch,
    faSignInAlt,
    faSignOutAlt,
    faSortAmountUp,
    faStar,
    faTachometerAlt,
    faThLarge,
    faThList,
    faTrash,
    // faTrashAlt,
    faUnlock,
    faUser,
    faUserCheck,
    faUserLock,
    faUsers,
    faWrench,
} from '@fortawesome/free-solid-svg-icons'

import {
    faCircle as faCircleRegular,
    faClock as faClockRegular,
    faTrashAlt as faTrashAltRegular,
} from '@fortawesome/free-regular-svg-icons'


import {
    faCreativeCommons,
    faFacebook,
    faGoogle,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'




// registered globally

export default function install(Vue){

    library.add(

            faCloud,
            faSun,

        //solid icons
        faAngleDown,
        faArrowsAltV,
        faArrowRight,
        faAt,
        faAtlas,
        faBold,
        faBan,
        faBars,
        faBomb,
        faBug,
        faBullseye,
        faCamera,
        faCheckCircle,
    //    faCheckSquare,
        faChevronLeft,
        faChevronRight,
        faCircle,
        faCode,
        faCogs,
        faColumns,
        faComment,
        faComments,
        faCompass,
        faCompress,
        faDatabase,
        faEdit,
        faExpand,
        faEye,
        faFlag,
        faFlagCheckered,
        faGlobeAmericas,
        faGrin,
        faHashtag,
        faHeading,
        faHeart,
        faHistory,
        faHome,
        faImage,
        faInfo,
        faInfoCircle,
        faItalic,
        faKey,
        faLayerGroup,
        faLink,
        faList,
        faListOl,
        faListUl,
        faLock,
        faMap,
        faMapMarkedAlt,
        faMapPin,
        faMinus,
        faNewspaper,
        faObjectGroup,
        faPen,
        faPlus,
        faPlusCircle,
        faQuestionCircle,
        faRoute,
        faSearch,
        faSignInAlt,
        faSignOutAlt,
        faSortAmountUp,
        faStar,
    //    faSquare,
        faTachometerAlt,
        faThLarge,
        faThList,
        faTrash,
        // faTrashAlt,
        faUnlock,
        faUser,
        faUserCheck,
        faUserLock,
        faUsers,
        faWrench,

        //regular icons
        faCircleRegular,
        faClockRegular,
        faTrashAltRegular,

        //brands icons
        faCreativeCommons,
        faFacebook,
        faGoogle,
        faTwitter,
    )

    Vue.component('fa-icon', FontAwesomeIcon)
    Vue.component('fa-layers', FontAwesomeLayers)
}