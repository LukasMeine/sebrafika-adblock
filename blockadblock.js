/**
 * Minified by jsDelivr using UglifyJS v3.3.22.
 * Original file: /npm/fuckadblock@3.2.1/fuckadblock.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function (o) {
  var t = function (t) {
    (this._options = {
      checkOnLoad: !1,
      resetOnEnd: !1,
      loopCheckTime: 50,
      loopMaxNumber: 5,
      baitClass:
        "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
      baitStyle:
        "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
      debug: !1,
    }),
      (this._var = {
        version: "3.2.1",
        bait: null,
        checking: !1,
        loop: null,
        loopNumber: 0,
        event: { detected: [], notDetected: [] },
      }),
      void 0 !== t && this.setOption(t);
    var e = this,
      i = function () {
        setTimeout(function () {
          !0 === e._options.checkOnLoad &&
            (!0 === e._options.debug &&
              e._log("onload->eventCallback", "A check loading is launched"),
            null === e._var.bait && e._creatBait(),
            setTimeout(function () {
              e.check();
            }, 1));
        }, 1);
      };
    void 0 !== o.addEventListener
      ? o.addEventListener("load", i, !1)
      : o.attachEvent("onload", i);
  };
  (t.prototype._options = null),
    (t.prototype._var = null),
    (t.prototype._bait = null),
    (t.prototype._log = function (t, e) {
      console.log("[FuckAdBlock][" + t + "] " + e);
    }),
    (t.prototype.setOption = function (t, e) {
      if (void 0 !== e) {
        var i = t;
        (t = {})[i] = e;
      }
      for (var o in t)
        (this._options[o] = t[o]),
          !0 === this._options.debug &&
            this._log(
              "setOption",
              'The option "' + o + '" he was assigned to "' + t[o] + '"'
            );
      return this;
    }),
    (t.prototype._creatBait = function () {
      var t = document.createElement("div");
      t.setAttribute("class", this._options.baitClass),
        t.setAttribute("style", this._options.baitStyle),
        (this._var.bait = o.document.body.appendChild(t)),
        this._var.bait.offsetParent,
        this._var.bait.offsetHeight,
        this._var.bait.offsetLeft,
        this._var.bait.offsetTop,
        this._var.bait.offsetWidth,
        this._var.bait.clientHeight,
        this._var.bait.clientWidth,
        !0 === this._options.debug &&
          this._log("_creatBait", "Bait has been created");
    }),
    (t.prototype._destroyBait = function () {
      o.document.body.removeChild(this._var.bait),
        !(this._var.bait = null) === this._options.debug &&
          this._log("_destroyBait", "Bait has been removed");
    }),
    (t.prototype.check = function (t) {
      if (
        (void 0 === t && (t = !0),
        !0 === this._options.debug &&
          this._log(
            "check",
            "An audit was requested " +
              (!0 === t ? "with a" : "without") +
              " loop"
          ),
        !0 === this._var.checking)
      )
        return (
          !0 === this._options.debug &&
            this._log(
              "check",
              "A check was canceled because there is already an ongoing"
            ),
          !1
        );
      (this._var.checking = !0), null === this._var.bait && this._creatBait();
      var e = this;
      return (
        !(this._var.loopNumber = 0) === t &&
          (this._var.loop = setInterval(function () {
            e._checkBait(t);
          }, this._options.loopCheckTime)),
        setTimeout(function () {
          e._checkBait(t);
        }, 1),
        !0 === this._options.debug &&
          this._log("check", "A check is in progress ..."),
        !0
      );
    }),
    (t.prototype._checkBait = function (t) {
      var e = !1;
      if (
        (null === this._var.bait && this._creatBait(),
        (null === o.document.body.getAttribute("abp") &&
          null !== this._var.bait.offsetParent &&
          0 != this._var.bait.offsetHeight &&
          0 != this._var.bait.offsetLeft &&
          0 != this._var.bait.offsetTop &&
          0 != this._var.bait.offsetWidth &&
          0 != this._var.bait.clientHeight &&
          0 != this._var.bait.clientWidth) ||
          (e = !0),
        void 0 !== o.getComputedStyle)
      ) {
        var i = o.getComputedStyle(this._var.bait, null);
        !i ||
          ("none" != i.getPropertyValue("display") &&
            "hidden" != i.getPropertyValue("visibility")) ||
          (e = !0);
      }
      !0 === this._options.debug &&
        this._log(
          "_checkBait",
          "A check (" +
            (this._var.loopNumber + 1) +
            "/" +
            this._options.loopMaxNumber +
            " ~" +
            (1 + this._var.loopNumber * this._options.loopCheckTime) +
            "ms) was conducted and detection is " +
            (!0 === e ? "positive" : "negative")
        ),
        !0 === t &&
          (this._var.loopNumber++,
          this._var.loopNumber >= this._options.loopMaxNumber &&
            this._stopLoop()),
        !0 === e
          ? (this._stopLoop(),
            this._destroyBait(),
            this.emitEvent(!0),
            !0 === t && (this._var.checking = !1))
          : (null !== this._var.loop && !1 !== t) ||
            (this._destroyBait(),
            this.emitEvent(!1),
            !0 === t && (this._var.checking = !1));
    }),
    (t.prototype._stopLoop = function (t) {
      clearInterval(this._var.loop),
        (this._var.loop = null),
        !(this._var.loopNumber = 0) === this._options.debug &&
          this._log("_stopLoop", "A loop has been stopped");
    }),
    (t.prototype.emitEvent = function (t) {
      !0 === this._options.debug &&
        this._log(
          "emitEvent",
          "An event with a " +
            (!0 === t ? "positive" : "negative") +
            " detection was called"
        );
      var e = this._var.event[!0 === t ? "detected" : "notDetected"];
      for (var i in e)
        !0 === this._options.debug &&
          this._log(
            "emitEvent",
            "Call function " + (parseInt(i) + 1) + "/" + e.length
          ),
          e.hasOwnProperty(i) && e[i]();
      return !0 === this._options.resetOnEnd && this.clearEvent(), this;
    }),
    (t.prototype.clearEvent = function () {
      (this._var.event.detected = []),
        (this._var.event.notDetected = []),
        !0 === this._options.debug &&
          this._log("clearEvent", "The event list has been cleared");
    }),
    (t.prototype.on = function (t, e) {
      return (
        this._var.event[!0 === t ? "detected" : "notDetected"].push(e),
        !0 === this._options.debug &&
          this._log(
            "on",
            'A type of event "' +
              (!0 === t ? "detected" : "notDetected") +
              '" was added'
          ),
        this
      );
    }),
    (t.prototype.onDetected = function (t) {
      return this.on(!0, t);
    }),
    (t.prototype.onNotDetected = function (t) {
      return this.on(!1, t);
    }),
    (o.FuckAdBlock = t),
    void 0 === o.fuckAdBlock &&
      (o.fuckAdBlock = new t({ checkOnLoad: !0, resetOnEnd: !0 }));
})(window);
//# sourceMappingURL=/sm/6f8e760c18ad8469c5062a54020dc61b6b5b994e2cf34307e96ec773888a0681.map
