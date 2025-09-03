import { stackMiddlewares } from './middlewares/stackMiddlewares';
import { withAuthorization } from './middlewares/withAuthorization';
import { withLogging } from './middlewares/withLogging';
import { withHeaders } from './middlewares/withHeaders';
import { withI18n } from './middlewares/withI18n';

export const config = {
  matcher: ['/((?!api|media|pay|revalidate|_next/static|_next/image|img|assets|favicon.ico|sw.js|robots|server-sitemap.xml).*)'],
};
export default stackMiddlewares([withAuthorization, withLogging, withHeaders, withI18n]);
