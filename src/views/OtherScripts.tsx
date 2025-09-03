import Script from 'next/script';

export const OtherScripts = () => {
  return (
    <>
      <Script id="helpcrunch-script" strategy="afterInteractive">
        {`
          window.helpcrunchSettings = {
            organization: 'holdyou',
            appId: 'feafc264-06ec-4d25-ba27-520ef0ba40f3',
          };

          (function(w,d){var hS=w.helpcrunchSettings;if(!hS||!hS.organization){return;}var widgetSrc='https://'+hS.organization+'.widget.helpcrunch.com/';w.HelpCrunch=function(){w.HelpCrunch.q.push(arguments)};w.HelpCrunch.q=[];function r(){if (d.querySelector('script[src="' + widgetSrc + '"')) { return; }var s=d.createElement('script');s.async=1;s.type='text/javascript';s.src=widgetSrc;(d.body||d.head).appendChild(s);}if(d.readyState === 'complete'||hS.loadImmediately){r();} else if(w.attachEvent){w.attachEvent('onload',r)}else{w.addEventListener('load',r,false)}})(window, document);
        `}
      </Script>
    </>
  );
};
