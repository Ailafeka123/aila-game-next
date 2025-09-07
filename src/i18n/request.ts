import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
    
  console.log("這裡是request");
  console.log(requested)
  console.log(`${locale}`)
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});