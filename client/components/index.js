/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as NavbarComp} from './navbar'
export {default as UserHome} from './user-home'
export {default as Home} from './home'
export {default as Footer} from './footer'
export {default as Products} from './productsView'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart/cart'
export {default as Checkout} from './checkout'
export {default as Confirmation} from './confirmation'
export {default as ViewSingleUser} from './viewSingleUser'
export {default as ViewUsers} from './viewUsers'
