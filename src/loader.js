(function (n, c) {
  if (c[n] === void 0) {
    c[n] = function () {
      c[n].clients.push(this)
      this._init = [Array.prototype.slice.call(arguments)]
    }
    c[n].clients = []

    var action = function (method) {
      return function () {
        this['_' + method] = this['_' + method] || []
        this['_' + method].push(Array.prototype.slice.call(arguments))
        return this
      }
    }

    var methods = ['blockEvents', 'fetchServerCookie', 'unblockEvents', 'setSignedMode', 'setAnonymousMode', 'resetUUID', 'addRecord', 'fetchGlobalID', 'set', 'trackEvent', 'trackPageview', 'trackClicks', 'ready']
    for (var i = 0; i < methods.length; i++) {
      var method = methods[i]
      c[n].prototype[method] = action(method)
    }

    var domain, doc, where, iframeStyle
    var iframe = document.createElement('iframe')

    iframe.src = 'javascript:false'
    iframe.title = ''
    iframe.role = 'presentation'
    iframe.loading = 'eager'

    iframeStyle = (iframe.frameElement || iframe).style
    iframeStyle.width = 0
    iframeStyle.height = 0
    iframeStyle.border = 0
    iframeStyle.display = 'none'

    where = document.currentScript || document.getElementsByTagName('script')[0]
    where.parentNode.insertBefore(iframe, where)

    try {
      doc = iframe.contentWindow.document
    } catch (e) {
      domain = document.domain
      iframe.src = 'javascript:var d=document.open();d.domain="' + domain + '";void(0);'
      doc = iframe.contentWindow.document
    }
    doc.open()._loadScript = function () {
      var js = this.createElement('script')
      if (domain) this.domain = domain
      js.id = 'td-js-iframe'

      js.src = (
        document.location.protocol === 'https:'
          ? 'https:'
          : 'http:'
      ) + '@URL'
      this.body.appendChild(js)
    }
    doc.write('<body onload="document._loadScript();">')
    doc.close()
  }
})('@GLOBAL', this)
