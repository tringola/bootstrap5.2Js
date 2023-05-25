/*!
 * Bootstrap v5.2.0 (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
var Bootstrap = {};

/**
 * ajout de function pour combler faute de object spread (...) siyntax
 */
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/



function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
        for (const k in e) {
            if (k !== 'default') {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: () => e[k]
            });
            }
        }
    }
    n.default = e;
    return Object.freeze(n);
}



/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const MAX_UID = 1000000;
const MILLISECONDS_MULTIPLIER = 1000;
const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

const toType = object => {
    if (object === null || object === undefined) {
        return `${object}`;
    }

    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
 * Public Util API
 */


const getUID = prefix => {
    do {
        prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
};

const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
        let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
        // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
        // `document.querySelector` will rightfully complain it is invalid.
        // See https://github.com/twbs/bootstrap/issues/32273

        if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
            return null;
        } // Just in case some CMS puts out a full URL with the anchor appended


        if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
            hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
        }

        selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }

    return selector;
};

const getSelectorFromElement = element => {
    const selector = getSelector(element);

    if (selector) {
        return document.querySelector(selector) ? selector : null;
    }

    return null;
};

const getElementFromSelector = element => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
};

const getTransitionDurationFromElement = element => {
    if (!element) {
        return 0;
    } // Get transition-duration of the element


    let {
        transitionDuration,
        transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};

const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
};

const isElement = object => {
    if (!object || typeof object !== 'object') {
        return false;
    }

    if (typeof object.jquery !== 'undefined') {
        object = object[0];
    }

    return typeof object.nodeType !== 'undefined';
};

const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement(object)) {
        return object.jquery ? object[0] : object;
    }

    if (typeof object === 'string' && object.length > 0) {
        return document.querySelector(object);
    }

    return null;
};

const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
        return false;
    }

    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

    const closedDetails = element.closest('details:not([open])');

    if (!closedDetails) {
        return elementIsVisible;
    }

    if (closedDetails !== element) {
        const summary = element.closest('summary');

        if (summary && summary.parentNode !== closedDetails) {
            return false;
        }

        if (summary === null) {
            return false;
        }
    }

    return elementIsVisible;
};

const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return true;
    }

    if (element.classList.contains('disabled')) {
        return true;
    }

    if (typeof element.disabled !== 'undefined') {
        return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};

const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
        return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
        return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
        return null;
    }

    return findShadowRoot(element.parentNode);
};

const noop = () => {};
/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.harrytheo.com/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */


const reflow = element => {
    return void element.offsetHeight; // eslint-disable-line no-unused-expressions
};

const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
        return window.jQuery;
    }

    return null;
};

const DOMContentLoadedCallbacks = [];

const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
        // add listener on the first call when the document is in loading state
        if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener('DOMContentLoaded', () => {
                for (const callback of DOMContentLoadedCallbacks) {
                callback();
            }
        });
        }

        DOMContentLoadedCallbacks.push(callback);
    } else {
        callback();
    }
};

const isRTL = () => document.documentElement.dir === 'rtl';



const execute = callback => {
    if (typeof callback === 'function') {
        callback();
    }
};

const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
        execute(callback);
        return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
        target
    }) => {
        if (target !== transitionElement) {
            return;
        }

        called = true;
        transitionElement.removeEventListener(TRANSITION_END, handler);
        execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
        if (!called) {
        triggerTransitionEnd(transitionElement);
    }
}, emulatedDuration);
};
/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */


const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed

    if (index === -1) {
        return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }

    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
        index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {}; // Events storage

let uidEvent = 1;
const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
};
const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
/**
 * Private methods
 */

function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}

function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
}

function bootstrapHandler(element, fn) {
    return function handler(event) {
        hydrateObj(event, {
            delegateTarget: element
        });

        if (handler.oneOff) {
            EventHandler.off(element, event.type, fn);
        }

        return fn.apply(element, [event]);
    };
}

function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
        const domElements = element.querySelectorAll(selector);

        for (let {
            target
        } = event; target && target !== this; target = target.parentNode) {
            for (const domElement of domElements) {
                if (domElement !== target) {
                    continue;
                }

                hydrateObj(event, {
                    delegateTarget: target
                });

                if (handler.oneOff) {
                    EventHandler.off(element, event.type, selector, fn);
                }

                return fn.apply(target, [event]);
            }
        }
    };
}

function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
}

function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);

    if (!nativeEvents.has(typeEvent)) {
        typeEvent = originalTypeEvent;
    }

    return [isDelegated, callable, typeEvent];
}

function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
        return;
    }

    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

    if (originalTypeEvent in customEvents) {
        const wrapFunction = fn => {
            return function (event) {
                if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                    return fn.call(this, event);
                }
            };
        };

        callable = wrapFunction(callable);
    }

    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

    if (previousFunction) {
        previousFunction.oneOff = previousFunction.oneOff && oneOff;
        return;
    }

    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
        return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};

    for (const handlerKey of Object.keys(storeElementEvent)) {
        if (handlerKey.includes(namespace)) {
            const event = storeElementEvent[handlerKey];
            removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
    }
}

function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
}

const EventHandler = {
    on(element, event, handler, delegationFunction) {
        addHandler(element, event, handler, delegationFunction, false);
    },

    one(element, event, handler, delegationFunction) {
        addHandler(element, event, handler, delegationFunction, true);
    },

    off(element, originalTypeEvent, handler, delegationFunction) {
        if (typeof originalTypeEvent !== 'string' || !element) {
            return;
        }

        const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
        const inNamespace = typeEvent !== originalTypeEvent;
        const events = getElementEvents(element);
        const storeElementEvent = events[typeEvent] || {};
        const isNamespace = originalTypeEvent.startsWith('.');

        if (typeof callable !== 'undefined') {
            // Simplest case: handler is passed, remove that listener ONLY.
            if (!Object.keys(storeElementEvent).length) {
                return;
            }

            removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
            return;
        }

        if (isNamespace) {
            for (const elementEvent of Object.keys(events)) {
                removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
            }
        }

        for (const keyHandlers of Object.keys(storeElementEvent)) {
            const handlerKey = keyHandlers.replace(stripUidRegex, '');

            if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                const event = storeElementEvent[keyHandlers];
                removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
            }
        }
    },

    trigger(element, event, args) {
        if (typeof event !== 'string' || !element) {
            return null;
        }


        const $ = getjQuery();
        const typeEvent = getTypeEvent(event);
        const inNamespace = event !== typeEvent;
        let jQueryEvent = null;
        let bubbles = true;
        let nativeDispatch = true;
        let defaultPrevented = false;

        if (inNamespace && $) {
            jQueryEvent = $.Event(event, args);
            $(element).trigger(jQueryEvent);
            bubbles = !jQueryEvent.isPropagationStopped();
            nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
            defaultPrevented = jQueryEvent.isDefaultPrevented();
        }

        let evt = new Event(event, {
            bubbles,
            cancelable: true
        });
        evt = hydrateObj(evt, args);

        if (defaultPrevented) {
            evt.preventDefault();
        }

        if (nativeDispatch) {
            element.dispatchEvent(evt);
        }

        if (evt.defaultPrevented && jQueryEvent) {
            jQueryEvent.preventDefault();
        }

        return evt;
    }

};

function hydrateObj(obj, meta) {
    for (const [key, value] of Object.entries(meta || {})) {
        try {
            obj[key] = value;
        } catch (_unused) {
            Object.defineProperty(obj, key, {
                configurable: true,

                get() {
                    return value;
                }

            });
        }
    }

    return obj;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */
const elementMap = new Map();
const Data = {
    set(element, key, instance) {
        if (!elementMap.has(element)) {
            elementMap.set(element, new Map());
        }

        const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
        // can be removed later when multiple key/instances are fine to be used

        if (!instanceMap.has(key) && instanceMap.size !== 0) {
            // eslint-disable-next-line no-console
            console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
            return;
        }

        instanceMap.set(key, instance);
    },

    get(element, key) {
        if (elementMap.has(element)) {
            return elementMap.get(element).get(key) || null;
        }

        return null;
    },

    remove(element, key) {
        if (!elementMap.has(element)) {
            return;
        }

        const instanceMap = elementMap.get(element);
        instanceMap.delete(key); // free up element references if there are no instances left for an element

        if (instanceMap.size === 0) {
            elementMap.delete(element);
        }
    }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
function normalizeData(value) {
    if (value === 'true') {
        return true;
    }

    if (value === 'false') {
        return false;
    }

    if (value === Number(value).toString()) {
        return Number(value);
    }

    if (value === '' || value === 'null') {
        return null;
    }

    if (typeof value !== 'string') {
        return value;
    }

    try {
        return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
        return value;
    }
}

function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
}

const Manipulator = {
    setDataAttribute(element, key, value) {
        element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
        element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
        if (!element) {
            return {};
        }

        const attributes = {};
        const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));

        for (const key of bsKeys) {
            let pureKey = key.replace(/^bs/, '');
            pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
            attributes[pureKey] = normalizeData(element.dataset[key]);
        }

        return attributes;
    },

    getDataAttribute(element, key) {
        return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Class definition
 */

class Config {
    // Getters
    static get Default() {
        return {};
    }
    static get DefaultType() {
        return {};
    }
    static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(config) {
        config = this._mergeConfigObj(config);
        config = this._configAfterMerge(config);
        this._typeCheckConfig(config);
        return config;
    }
    _configAfterMerge(config) {
        return config;
    }
    _mergeConfigObj(config, element) {
        const jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

        return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this.constructor.Default), typeof jsonConfig === 'object' ? jsonConfig : {}), isElement(element) ? Manipulator.getDataAttributes(element) : {}), typeof config === 'object' ? config : {});
    }
    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
        for (const property of Object.keys(configTypes)) {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = isElement(value) ? 'element' : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
                throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
        }
    }
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const VERSION = '5.2.0';
/**
 * Class definition
 */

class BaseComponent extends Config {
    constructor(element, config) {
        super();
        element = getElement(element);

        if (!element) {
            return;
        }

        this._element = element;
        this._config = this._getConfig(config);
        Data.set(this._element, this.constructor.DATA_KEY, this);
    } // Public


    dispose() {
        Data.remove(this._element, this.constructor.DATA_KEY);
        EventHandler.off(this._element, this.constructor.EVENT_KEY);

        for (const propertyName of Object.getOwnPropertyNames(this)) {
            this[propertyName] = null;
        }
    }

    _queueCallback(callback, element, isAnimated = true) {
        executeAfterTransition(callback, element, isAnimated);
    }

    _getConfig(config) {
        config = this._mergeConfigObj(config, this._element);
        config = this._configAfterMerge(config);

        this._typeCheckConfig(config);

        return config;
    } // Static


    static getInstance(element) {
        return Data.get(getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
        return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }

    static get VERSION() {
        return VERSION;
    }

    static get DATA_KEY() {
        return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
        return `.${this.DATA_KEY}`;
    }

    static eventName(name) {
        return `${name}${this.EVENT_KEY}`;
    }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
        if (['A', 'AREA'].includes(this.tagName)) {
            event.preventDefault();
        }

        if (isDisabled(this)) {
            return;
        }

        const target = getElementFromSelector(this) || this.closest(`.${name}`);
        const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

        instance[method]();
    });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$f = 'alert';
const DATA_KEY$a = 'bs.alert';
const EVENT_KEY$b = `.${DATA_KEY$a}`;
const EVENT_CLOSE = `close${EVENT_KEY$b}`;
const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
const CLASS_NAME_FADE$5 = 'fade';
const CLASS_NAME_SHOW$8 = 'show';
/**
 * Class definition
 */

class Alert extends BaseComponent {
    // Getters
    static get NAME() {
        return NAME$f;
    } // Public


    close() {
        const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

        if (closeEvent.defaultPrevented) {
            return;
        }

        this._element.classList.remove(CLASS_NAME_SHOW$8);

        const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

        this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    } // Private


    _destroyElement() {
        this._element.remove();

        EventHandler.trigger(this._element, EVENT_CLOSED);
        this.dispose();
    } // Static


    static jQueryInterface(config) {
        return this.each(function () {
            const data = Alert.getOrCreateInstance(this);

            if (typeof config !== 'string') {
                return;
            }

            if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                throw new TypeError(`No method named "${config}"`);
            }

            data[config](this);
        });
    }

}
/**
 * Data API implementation
 */


enableDismissTrigger(Alert, 'close');




/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$e = 'button';
const DATA_KEY$9 = 'bs.button';
const EVENT_KEY$a = `.${DATA_KEY$9}`;
const DATA_API_KEY$6 = '.data-api';
const CLASS_NAME_ACTIVE$3 = 'active';
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
/**
 * Class definition
 */

class Button extends BaseComponent {
    // Getters
    static get NAME() {
        return NAME$e;
    } // Public


    toggle() {
        // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
        this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    } // Static


    static jQueryInterface(config) {
        return this.each(function () {
            const data = Button.getOrCreateInstance(this);

            if (config === 'toggle') {
                data[config]();
            }
        });
    }

}
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
const data = Button.getOrCreateInstance(button);
data.toggle();
});


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const SelectorEngine = {
    find(selector, element = document.documentElement) {
        return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
        return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
        return [].concat(...element.children).filter(child => child.matches(selector));
    },

    parents(element, selector) {
        const parents = [];
        let ancestor = element.parentNode.closest(selector);

        while (ancestor) {
            parents.push(ancestor);
            ancestor = ancestor.parentNode.closest(selector);
        }

        return parents;
    },

    prev(element, selector) {
        let previous = element.previousElementSibling;

        while (previous) {
            if (previous.matches(selector)) {
                return [previous];
            }

            previous = previous.previousElementSibling;
        }

        return [];
    },

    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
        let next = element.nextElementSibling;

        while (next) {
            if (next.matches(selector)) {
                return [next];
            }

            next = next.nextElementSibling;
        }

        return [];
    },

    focusableChildren(element) {
        const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
        return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/swipe.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$d = 'swipe';
const EVENT_KEY$9 = '.bs.swipe';
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
const POINTER_TYPE_TOUCH = 'touch';
const POINTER_TYPE_PEN = 'pen';
const CLASS_NAME_POINTER_EVENT = 'pointer-event';
const SWIPE_THRESHOLD = 40;
const Default$c = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null
};
const DefaultType$c = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
};
/**
 * Class definition
 */

class Swipe extends Config {
    constructor(element, config) {
        super();
        this._element = element;

        if (!element || !Swipe.isSupported()) {
            return;
        }

        this._config = this._getConfig(config);
        this._deltaX = 0;
        this._supportPointerEvents = Boolean(window.PointerEvent);

        this._initEvents();
    } // Getters


    static get Default() {
        return Default$c;
    }

    static get DefaultType() {
        return DefaultType$c;
    }

    static get NAME() {
        return NAME$d;
    } // Public


    dispose() {
        EventHandler.off(this._element, EVENT_KEY$9);
    } // Private


    _start(event) {
        if (!this._supportPointerEvents) {
            this._deltaX = event.touches[0].clientX;
            return;
        }

        if (this._eventIsPointerPenTouch(event)) {
            this._deltaX = event.clientX;
        }
    }

    _end(event) {
        if (this._eventIsPointerPenTouch(event)) {
            this._deltaX = event.clientX - this._deltaX;
        }

        this._handleSwipe();

        execute(this._config.endCallback);
    }

    _move(event) {
        this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }

    _handleSwipe() {
        const absDeltaX = Math.abs(this._deltaX);

        if (absDeltaX <= SWIPE_THRESHOLD) {
            return;
        }

        const direction = absDeltaX / this._deltaX;
        this._deltaX = 0;

        if (!direction) {
            return;
        }

        execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }

    _initEvents() {
        if (this._supportPointerEvents) {
            EventHandler.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
            EventHandler.on(this._element, EVENT_POINTERUP, event => this._end(event));

            this._element.classList.add(CLASS_NAME_POINTER_EVENT);
        } else {
            EventHandler.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
            EventHandler.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
            EventHandler.on(this._element, EVENT_TOUCHEND, event => this._end(event));
        }
    }

    _eventIsPointerPenTouch(event) {
        return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    } // Static


    static isSupported() {
        return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$c = 'carousel';
const DATA_KEY$8 = 'bs.carousel';
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$5 = '.data-api';
const ARROW_LEFT_KEY$1 = 'ArrowLeft';
const ARROW_RIGHT_KEY$1 = 'ArrowRight';
const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

const ORDER_NEXT = 'next';
const ORDER_PREV = 'prev';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const EVENT_SLIDE = `slide${EVENT_KEY$8}`;
const EVENT_SLID = `slid${EVENT_KEY$8}`;
const EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
const EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
const EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
const EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
const CLASS_NAME_CAROUSEL = 'carousel';
const CLASS_NAME_ACTIVE$2 = 'active';
const CLASS_NAME_SLIDE = 'slide';
const CLASS_NAME_END = 'carousel-item-end';
const CLASS_NAME_START = 'carousel-item-start';
const CLASS_NAME_NEXT = 'carousel-item-next';
const CLASS_NAME_PREV = 'carousel-item-prev';
const SELECTOR_ACTIVE = '.active';
const SELECTOR_ITEM = '.carousel-item';
const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
const SELECTOR_ITEM_IMG = '.carousel-item img';
const SELECTOR_INDICATORS = '.carousel-indicators';
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
};
const Default$b = {
    interval: 5000,
    keyboard: true,
    pause: 'hover',
    ride: false,
    touch: true,
    wrap: true
};
const DefaultType$b = {
    interval: '(number|boolean)',
    // TODO:v6 remove boolean support
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
};
/**
 * Class definition
 */

class Carousel extends BaseComponent {
    constructor(element, config) {
        super(element, config);
        this._interval = null;
        this._activeElement = null;
        this._isSliding = false;
        this.touchTimeout = null;
        this._swipeHelper = null;
        this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);

        this._addEventListeners();

        if (this._config.ride === CLASS_NAME_CAROUSEL) {
            this.cycle();
        }
    } // Getters


    static get Default() {
        return Default$b;
    }

    static get DefaultType() {
        return DefaultType$b;
    }

    static get NAME() {
        return NAME$c;
    } // Public


    next() {
        this._slide(ORDER_NEXT);
    }

    nextWhenVisible() {
        // FIXME TODO use `document.visibilityState`
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && isVisible(this._element)) {
            this.next();
        }
    }

    prev() {
        this._slide(ORDER_PREV);
    }

    pause() {
        if (this._isSliding) {
            triggerTransitionEnd(this._element);
        }

        this._clearInterval();
    }

    cycle() {
        this._clearInterval();

        this._updateInterval();

        this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }

    _maybeEnableCycle() {
        if (!this._config.ride) {
            return;
        }

        if (this._isSliding) {
            EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
            return;
        }

        this.cycle();
    }

    to(index) {
        const items = this._getItems();

        if (index > items.length - 1 || index < 0) {
            return;
        }

        if (this._isSliding) {
            EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
            return;
        }

        const activeIndex = this._getItemIndex(this._getActive());

        if (activeIndex === index) {
            return;
        }

        const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

        this._slide(order, items[index]);
    }

    dispose() {
        if (this._swipeHelper) {
            this._swipeHelper.dispose();
        }

        super.dispose();
    } // Private


    _configAfterMerge(config) {
        config.defaultInterval = config.interval;
        return config;
    }

    _addEventListeners() {
        if (this._config.keyboard) {
            EventHandler.on(this._element, EVENT_KEYDOWN$1, event => this._keydown(event));
        }

        if (this._config.pause === 'hover') {
            EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
            EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
        }

        if (this._config.touch && Swipe.isSupported()) {
            this._addTouchEventListeners();
        }
    }

    _addTouchEventListeners() {
        for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
            EventHandler.on(img, EVENT_DRAG_START, event => event.preventDefault());
        }

        const endCallBack = () => {
            if (this._config.pause !== 'hover') {
                return;
            } // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling


            this.pause();

            if (this.touchTimeout) {
                clearTimeout(this.touchTimeout);
            }

            this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
        };

        const swipeConfig = {
                    leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
            rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
            endCallback: endCallBack
    };
        this._swipeHelper = new Swipe(this._element, swipeConfig);
    }

    _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
            return;
        }

        const direction = KEY_TO_DIRECTION[event.key];

        if (direction) {
            event.preventDefault();

            this._slide(this._directionToOrder(direction));
        }
    }

    _getItemIndex(element) {
        return this._getItems().indexOf(element);
    }

    _setActiveIndicatorElement(index) {
        if (!this._indicatorsElement) {
            return;
        }

        const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
        activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
        activeIndicator.removeAttribute('aria-current');
        const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);

        if (newActiveIndicator) {
            newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
            newActiveIndicator.setAttribute('aria-current', 'true');
        }
    }

    _updateInterval() {
        const element = this._activeElement || this._getActive();

        if (!element) {
            return;
        }

        const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
        this._config.interval = elementInterval || this._config.defaultInterval;
    }

    _slide(order, element = null) {
        if (this._isSliding) {
            return;
        }

        const activeElement = this._getActive();

        const isNext = order === ORDER_NEXT;
        const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);

        if (nextElement === activeElement) {
            return;
        }

        const nextElementIndex = this._getItemIndex(nextElement);

        const triggerEvent = eventName => {
            return EventHandler.trigger(this._element, eventName, {
                relatedTarget: nextElement,
                direction: this._orderToDirection(order),
                from: this._getItemIndex(activeElement),
                to: nextElementIndex
            });
        };

        const slideEvent = triggerEvent(EVENT_SLIDE);

        if (slideEvent.defaultPrevented) {
            return;
        }

        if (!activeElement || !nextElement) {
            // Some weirdness is happening, so we bail
            // todo: change tests that use empty divs to avoid this check
            return;
        }

        const isCycling = Boolean(this._interval);
        this.pause();
        this._isSliding = true;

        this._setActiveIndicatorElement(nextElementIndex);

        this._activeElement = nextElement;
        const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
        const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);

        const completeCallBack = () => {
            nextElement.classList.remove(directionalClassName, orderClassName);
            nextElement.classList.add(CLASS_NAME_ACTIVE$2);
            activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
            this._isSliding = false;
            triggerEvent(EVENT_SLID);
        };

        this._queueCallback(completeCallBack, activeElement, this._isAnimated());

        if (isCycling) {
            this.cycle();
        }
    }

    _isAnimated() {
        return this._element.classList.contains(CLASS_NAME_SLIDE);
    }

    _getActive() {
        return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }

    _getItems() {
        return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }

    _clearInterval() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }

    _directionToOrder(direction) {
        if (isRTL()) {
            return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
        }

        return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }

    _orderToDirection(order) {
        if (isRTL()) {
            return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }

        return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    } // Static


    static jQueryInterface(config) {
        return this.each(function () {
            const data = Carousel.getOrCreateInstance(this, config);

            if (typeof config === 'number') {
                data.to(config);
                return;
            }

            if (typeof config === 'string') {
                if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                    throw new TypeError(`No method named "${config}"`);
                }

                data[config]();
            }
        });
    }

}
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
    const target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
    }

    event.preventDefault();
    const carousel = Carousel.getOrCreateInstance(target);
    const slideIndex = this.getAttribute('data-bs-slide-to');

    if (slideIndex) {
        carousel.to(slideIndex);

        carousel._maybeEnableCycle();

        return;
    }

    if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
        carousel.next();

        carousel._maybeEnableCycle();

        return;
    }

    carousel.prev();

    carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

for (const carousel of carousels) {
    Carousel.getOrCreateInstance(carousel);
}
});


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$b = 'collapse';
const DATA_KEY$7 = 'bs.collapse';
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const DATA_API_KEY$4 = '.data-api';
const EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
const EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
const EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
const EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$7 = 'show';
const CLASS_NAME_COLLAPSE = 'collapse';
const CLASS_NAME_COLLAPSING = 'collapsing';
const CLASS_NAME_COLLAPSED = 'collapsed';
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
const WIDTH = 'width';
const HEIGHT = 'height';
const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
const Default$a = {
    parent: null,
    toggle: true
};
const DefaultType$a = {
    parent: '(null|element)',
    toggle: 'boolean'
};
/**
 * Class definition
 */

class Collapse extends BaseComponent {
    constructor(element, config) {
        super(element, config);
        this._isTransitioning = false;
        this._triggerArray = [];
        const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

        for (const elem of toggleList) {
            const selector = getSelectorFromElement(elem);
            const filterElement = SelectorEngine.find(selector).filter(foundElement => foundElement === this._element);

            if (selector !== null && filterElement.length) {
                this._triggerArray.push(elem);
            }
        }

        this._initializeChildren();

        if (!this._config.parent) {
            this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
        }

        if (this._config.toggle) {
            this.toggle();
        }
    } // Getters


    static get Default() {
        return Default$a;
    }

    static get DefaultType() {
        return DefaultType$a;
    }

    static get NAME() {
        return NAME$b;
    } // Public


    toggle() {
        if (this._isShown()) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        if (this._isTransitioning || this._isShown()) {
            return;
        }

        let activeChildren = []; // find active children

        if (this._config.parent) {
            activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
                toggle: false
            }));
        }

        if (activeChildren.length && activeChildren[0]._isTransitioning) {
            return;
        }

        const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);

        if (startEvent.defaultPrevented) {
            return;
        }

        for (const activeInstance of activeChildren) {
            activeInstance.hide();
        }

        const dimension = this._getDimension();

        this._element.classList.remove(CLASS_NAME_COLLAPSE);

        this._element.classList.add(CLASS_NAME_COLLAPSING);

        this._element.style[dimension] = 0;

        this._addAriaAndCollapsedClass(this._triggerArray, true);

        this._isTransitioning = true;

        const complete = () => {
            this._isTransitioning = false;

            this._element.classList.remove(CLASS_NAME_COLLAPSING);

            this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

            this._element.style[dimension] = '';
            EventHandler.trigger(this._element, EVENT_SHOWN$6);
        };

        const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        const scrollSize = `scroll${capitalizedDimension}`;

        this._queueCallback(complete, this._element, true);

        this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
        if (this._isTransitioning || !this._isShown()) {
            return;
        }

        const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);

        if (startEvent.defaultPrevented) {
            return;
        }

        const dimension = this._getDimension();

        this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
        reflow(this._element);

        this._element.classList.add(CLASS_NAME_COLLAPSING);

        this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

        for (const trigger of this._triggerArray) {
            const element = getElementFromSelector(trigger);

            if (element && !this._isShown(element)) {
                this._addAriaAndCollapsedClass([trigger], false);
            }
        }

        this._isTransitioning = true;

        const complete = () => {
            this._isTransitioning = false;

            this._element.classList.remove(CLASS_NAME_COLLAPSING);

            this._element.classList.add(CLASS_NAME_COLLAPSE);

            EventHandler.trigger(this._element, EVENT_HIDDEN$6);
        };

        this._element.style[dimension] = '';

        this._queueCallback(complete, this._element, true);
    }

    _isShown(element = this._element) {
        return element.classList.contains(CLASS_NAME_SHOW$7);
    } // Private


    _configAfterMerge(config) {
        config.toggle = Boolean(config.toggle); // Coerce string values

        config.parent = getElement(config.parent);
        return config;
    }

    _getDimension() {
        return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }

    _initializeChildren() {
        if (!this._config.parent) {
            return;
        }

        const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);

        for (const element of children) {
            const selected = getElementFromSelector(element);

            if (selected) {
                this._addAriaAndCollapsedClass([element], this._isShown(selected));
            }
        }
    }

    _getFirstLevelChildren(selector) {
        const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

        return SelectorEngine.find(selector, this._config.parent).filter(element => !children.includes(element));
    }

    _addAriaAndCollapsedClass(triggerArray, isOpen) {
        if (!triggerArray.length) {
            return;
        }

        for (const element of triggerArray) {
            element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
            element.setAttribute('aria-expanded', isOpen);
        }
    } // Static


    static jQueryInterface(config) {
        const _config = {};

        if (typeof config === 'string' && /show|hide/.test(config)) {
            _config.toggle = false;
        }

        return this.each(function () {
            const data = Collapse.getOrCreateInstance(this, _config);

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError(`No method named "${config}"`);
                }

                data[config]();
            }
        });
    }

}
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
        event.preventDefault();
    }

    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);

    for (const element of selectorElements) {
        Collapse.getOrCreateInstance(element, {
            toggle: false
        }).toggle();
    }
});




/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
const SELECTOR_STICKY_CONTENT = '.sticky-top';
const PROPERTY_PADDING = 'padding-right';
const PROPERTY_MARGIN = 'margin-right';
/**
 * Class definition
 */

class ScrollBarHelper {
    constructor() {
        this._element = document.body;
    } // Public


    getWidth() {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
        const documentWidth = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - documentWidth);
    }

    hide() {
        const width = this.getWidth();

        this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


        this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


        this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);

        this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
    }

    reset() {
        this._resetElementAttributes(this._element, 'overflow');

        this._resetElementAttributes(this._element, PROPERTY_PADDING);

        this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);

        this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }

    isOverflowing() {
        return this.getWidth() > 0;
    } // Private


    _disableOverFlow() {
        this._saveInitialAttribute(this._element, 'overflow');

        this._element.style.overflow = 'hidden';
    }

    _setElementAttributes(selector, styleProperty, callback) {
        const scrollbarWidth = this.getWidth();

        const manipulationCallBack = element => {
            if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
                return;
            }

            this._saveInitialAttribute(element, styleProperty);

            const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
            element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
        };

        this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _saveInitialAttribute(element, styleProperty) {
        const actualValue = element.style.getPropertyValue(styleProperty);

        if (actualValue) {
            Manipulator.setDataAttribute(element, styleProperty, actualValue);
        }
    }

    _resetElementAttributes(selector, styleProperty) {
        const manipulationCallBack = element => {
            const value = Manipulator.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

            if (value === null) {
                element.style.removeProperty(styleProperty);
                return;
            }

            Manipulator.removeDataAttribute(element, styleProperty);
            element.style.setProperty(styleProperty, value);
        };

        this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _applyManipulationCallback(selector, callBack) {
        if (isElement(selector)) {
            callBack(selector);
            return;
        }

        for (const sel of SelectorEngine.find(selector, this._element)) {
            callBack(sel);
        }
    }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$9 = 'backdrop';
const CLASS_NAME_FADE$4 = 'fade';
const CLASS_NAME_SHOW$5 = 'show';
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
const Default$8 = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: false,
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    rootElement: 'body' // give the choice to place backdrop under different elements

};
const DefaultType$8 = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
};
/**
 * Class definition
 */

class Backdrop extends Config {
    constructor(config) {
        super();
        this._config = this._getConfig(config);
        this._isAppended = false;
        this._element = null;
    } // Getters


    static get Default() {
        return Default$8;
    }

    static get DefaultType() {
        return DefaultType$8;
    }

    static get NAME() {
        return NAME$9;
    } // Public


    show(callback) {
        if (!this._config.isVisible) {
            execute(callback);
            return;
        }

        this._append();

        const element = this._getElement();

        if (this._config.isAnimated) {
            reflow(element);
        }

        element.classList.add(CLASS_NAME_SHOW$5);

        this._emulateAnimation(() => {
            execute(callback);
    });
    }

    hide(callback) {
        if (!this._config.isVisible) {
            execute(callback);
            return;
        }

        this._getElement().classList.remove(CLASS_NAME_SHOW$5);

        this._emulateAnimation(() => {
            this.dispose();
        execute(callback);
    });
    }

    dispose() {
        if (!this._isAppended) {
            return;
        }

        EventHandler.off(this._element, EVENT_MOUSEDOWN);

        this._element.remove();

        this._isAppended = false;
    } // Private


    _getElement() {
        if (!this._element) {
            const backdrop = document.createElement('div');
            backdrop.className = this._config.className;

            if (this._config.isAnimated) {
                backdrop.classList.add(CLASS_NAME_FADE$4);
            }

            this._element = backdrop;
        }

        return this._element;
    }

    _configAfterMerge(config) {
        // use getElement() with the default "body" to get a fresh Element on each instantiation
        config.rootElement = getElement(config.rootElement);
        return config;
    }

    _append() {
        if (this._isAppended) {
            return;
        }

        const element = this._getElement();

        this._config.rootElement.append(element);

        EventHandler.on(element, EVENT_MOUSEDOWN, () => {
            execute(this._config.clickCallback);
    });
        this._isAppended = true;
    }

    _emulateAnimation(callback) {
        executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$8 = 'focustrap';
const DATA_KEY$5 = 'bs.focustrap';
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
const TAB_KEY = 'Tab';
const TAB_NAV_FORWARD = 'forward';
const TAB_NAV_BACKWARD = 'backward';
const Default$7 = {
    autofocus: true,
    trapElement: null // The element to trap focus inside of

};
const DefaultType$7 = {
    autofocus: 'boolean',
    trapElement: 'element'
};
/**
 * Class definition
 */

class FocusTrap extends Config {
    constructor(config) {
        super();
        this._config = this._getConfig(config);
        this._isActive = false;
        this._lastTabNavDirection = null;
    } // Getters


    static get Default() {
        return Default$7;
    }

    static get DefaultType() {
        return DefaultType$7;
    }

    static get NAME() {
        return NAME$8;
    } // Public


    activate() {
        if (this._isActive) {
            return;
        }

        if (this._config.autofocus) {
            this._config.trapElement.focus();
        }

        EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop

        EventHandler.on(document, EVENT_FOCUSIN$2, event => this._handleFocusin(event));
        EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
        this._isActive = true;
    }

    deactivate() {
        if (!this._isActive) {
            return;
        }

        this._isActive = false;
        EventHandler.off(document, EVENT_KEY$5);
    } // Private


    _handleFocusin(event) {
        const {
            trapElement
        } = this._config;

        if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
            return;
        }

        const elements = SelectorEngine.focusableChildren(trapElement);

        if (elements.length === 0) {
            trapElement.focus();
        } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
            elements[elements.length - 1].focus();
        } else {
            elements[0].focus();
        }
    }

    _handleKeydown(event) {
        if (event.key !== TAB_KEY) {
            return;
        }

        this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$7 = 'modal';
const DATA_KEY$4 = 'bs.modal';
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const DATA_API_KEY$2 = '.data-api';
const ESCAPE_KEY$1 = 'Escape';
const EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
const EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
const EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_FADE$3 = 'fade';
const CLASS_NAME_SHOW$4 = 'show';
const CLASS_NAME_STATIC = 'modal-static';
const OPEN_SELECTOR$1 = '.modal.show';
const SELECTOR_DIALOG = '.modal-dialog';
const SELECTOR_MODAL_BODY = '.modal-body';
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
const Default$6 = {
    backdrop: true,
    focus: true,
    keyboard: true
};
const DefaultType$6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean'
};
/**
 * Class definition
 */

class Modal extends BaseComponent {
    constructor(element, config) {
        super(element, config);
        this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
        this._backdrop = this._initializeBackDrop();
        this._focustrap = this._initializeFocusTrap();
        this._isShown = false;
        this._isTransitioning = false;
        this._scrollBar = new ScrollBarHelper();

        this._addEventListeners();
    } // Getters


    static get Default() {
        return Default$6;
    }

    static get DefaultType() {
        return DefaultType$6;
    }

    static get NAME() {
        return NAME$7;
    } // Public


    toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
        if (this._isShown || this._isTransitioning) {
            return;
        }

        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
            relatedTarget
        });

        if (showEvent.defaultPrevented) {
            return;
        }

        this._isShown = true;
        this._isTransitioning = true;

        this._scrollBar.hide();

        document.body.classList.add(CLASS_NAME_OPEN);

        this._adjustDialog();

        this._backdrop.show(() => this._showElement(relatedTarget));
    }

    hide() {
        if (!this._isShown || this._isTransitioning) {
            return;
        }

        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

        if (hideEvent.defaultPrevented) {
            return;
        }

        this._isShown = false;
        this._isTransitioning = true;

        this._focustrap.deactivate();

        this._element.classList.remove(CLASS_NAME_SHOW$4);

        this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
    }

    dispose() {
        for (const htmlElement of [window, this._dialog]) {
            EventHandler.off(htmlElement, EVENT_KEY$4);
        }

        this._backdrop.dispose();

        this._focustrap.deactivate();

        super.dispose();
    }

    handleUpdate() {
        this._adjustDialog();
    } // Private


    _initializeBackDrop() {
        return new Backdrop({
            isVisible: Boolean(this._config.backdrop),
            // 'static' option will be translated to true, and booleans will keep their value,
            isAnimated: this._isAnimated()
        });
    }

    _initializeFocusTrap() {
        return new FocusTrap({
            trapElement: this._element
        });
    }

    _showElement(relatedTarget) {
        // try to append dynamic modal
        if (!document.body.contains(this._element)) {
            document.body.append(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.setAttribute('aria-modal', true);

        this._element.setAttribute('role', 'dialog');

        this._element.scrollTop = 0;
        const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

        if (modalBody) {
            modalBody.scrollTop = 0;
        }

        reflow(this._element);

        this._element.classList.add(CLASS_NAME_SHOW$4);

        const transitionComplete = () => {
            if (this._config.focus) {
                this._focustrap.activate();
            }

            this._isTransitioning = false;
            EventHandler.trigger(this._element, EVENT_SHOWN$4, {
                relatedTarget
            });
        };

        this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }

    _addEventListeners() {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
            if (event.key !== ESCAPE_KEY$1) {
            return;
        }

        if (this._config.keyboard) {
            event.preventDefault();
            this.hide();
            return;
        }

        this._triggerBackdropTransition();
    });
        EventHandler.on(window, EVENT_RESIZE$1, () => {
            if (this._isShown && !this._isTransitioning) {
            this._adjustDialog();
        }
    });
        EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
            if (event.target !== event.currentTarget) {
            // click is inside modal-dialog
            return;
        }

        if (this._config.backdrop === 'static') {
            this._triggerBackdropTransition();

            return;
        }

        if (this._config.backdrop) {
            this.hide();
        }
    });
    }

    _hideModal() {
        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._element.removeAttribute('role');

        this._isTransitioning = false;

        this._backdrop.hide(() => {
            document.body.classList.remove(CLASS_NAME_OPEN);

        this._resetAdjustments();

        this._scrollBar.reset();

        EventHandler.trigger(this._element, EVENT_HIDDEN$4);
    });
    }

    _isAnimated() {
        return this._element.classList.contains(CLASS_NAME_FADE$3);
    }

    _triggerBackdropTransition() {
        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);

        if (hideEvent.defaultPrevented) {
            return;
        }

        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

        if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
            return;
        }

        if (!isModalOverflowing) {
            this._element.style.overflowY = 'hidden';
        }

        this._element.classList.add(CLASS_NAME_STATIC);

        this._queueCallback(() => {
            this._element.classList.remove(CLASS_NAME_STATIC);

        this._queueCallback(() => {
            this._element.style.overflowY = initialOverflowY;
    }, this._dialog);
    }, this._dialog);

        this._element.focus();
    }
    /**
     * The following methods are used to handle overflowing modals
     */


    _adjustDialog() {
        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        const scrollbarWidth = this._scrollBar.getWidth();

        const isBodyOverflowing = scrollbarWidth > 0;

        if (isBodyOverflowing && !isModalOverflowing) {
            const property = isRTL() ? 'paddingLeft' : 'paddingRight';
            this._element.style[property] = `${scrollbarWidth}px`;
        }

        if (!isBodyOverflowing && isModalOverflowing) {
            const property = isRTL() ? 'paddingRight' : 'paddingLeft';
            this._element.style[property] = `${scrollbarWidth}px`;
        }
    }

    _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
    } // Static


    static jQueryInterface(config, relatedTarget) {
        return this.each(function () {
            const data = Modal.getOrCreateInstance(this, config);

            if (typeof config !== 'string') {
                return;
            }

            if (typeof data[config] === 'undefined') {
                throw new TypeError(`No method named "${config}"`);
            }

            data[config](relatedTarget);
        });
    }

}
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$4, showEvent => {
        if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
    }

    EventHandler.one(target, EVENT_HIDDEN$4, () => {
        if (isVisible(this)) {
        this.focus();
    }
});
}); // avoid conflict when clicking modal toggler while another one is open

    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

    if (alreadyOpen) {
        Modal.getInstance(alreadyOpen).hide();
    }

    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
});
enableDismissTrigger(Modal);


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$6 = 'offcanvas';
const DATA_KEY$3 = 'bs.offcanvas';
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const DATA_API_KEY$1 = '.data-api';
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
const ESCAPE_KEY = 'Escape';
const CLASS_NAME_SHOW$3 = 'show';
const CLASS_NAME_SHOWING$1 = 'showing';
const CLASS_NAME_HIDING = 'hiding';
const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
const OPEN_SELECTOR = '.offcanvas.show';
const EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
const EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
const EVENT_RESIZE = `resize${EVENT_KEY$3}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
const Default$5 = {
    backdrop: true,
    keyboard: true,
    scroll: false
};
const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean'
};
/**
 * Class definition
 */

class Offcanvas extends BaseComponent {
    constructor(element, config) {
        super(element, config);
        this._isShown = false;
        this._backdrop = this._initializeBackDrop();
        this._focustrap = this._initializeFocusTrap();

        this._addEventListeners();
    } // Getters


    static get Default() {
        return Default$5;
    }

    static get DefaultType() {
        return DefaultType$5;
    }

    static get NAME() {
        return NAME$6;
    } // Public


    toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
        if (this._isShown) {
            return;
        }

        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
            relatedTarget
        });

        if (showEvent.defaultPrevented) {
            return;
        }

        this._isShown = true;

        this._backdrop.show();

        if (!this._config.scroll) {
            new ScrollBarHelper().hide();
        }

        this._element.setAttribute('aria-modal', true);

        this._element.setAttribute('role', 'dialog');

        this._element.classList.add(CLASS_NAME_SHOWING$1);

        const completeCallBack = () => {
            if (!this._config.scroll || this._config.backdrop) {
                this._focustrap.activate();
            }

            this._element.classList.add(CLASS_NAME_SHOW$3);

            this._element.classList.remove(CLASS_NAME_SHOWING$1);

            EventHandler.trigger(this._element, EVENT_SHOWN$3, {
                relatedTarget
            });
        };

        this._queueCallback(completeCallBack, this._element, true);
    }

    hide() {
        if (!this._isShown) {
            return;
        }

        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

        if (hideEvent.defaultPrevented) {
            return;
        }

        this._focustrap.deactivate();

        this._element.blur();

        this._isShown = false;

        this._element.classList.add(CLASS_NAME_HIDING);

        this._backdrop.hide();

        const completeCallback = () => {
            this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);

            this._element.removeAttribute('aria-modal');

            this._element.removeAttribute('role');

            if (!this._config.scroll) {
                new ScrollBarHelper().reset();
            }

            EventHandler.trigger(this._element, EVENT_HIDDEN$3);
        };

        this._queueCallback(completeCallback, this._element, true);
    }

    dispose() {
        this._backdrop.dispose();

        this._focustrap.deactivate();

        super.dispose();
    } // Private


    _initializeBackDrop() {
        const clickCallback = () => {
            if (this._config.backdrop === 'static') {
                EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
                return;
            }

            this.hide();
        }; // 'static' option will be translated to true, and booleans will keep their value


        const isVisible = Boolean(this._config.backdrop);
        return new Backdrop({
            className: CLASS_NAME_BACKDROP,
            isVisible,
            isAnimated: true,
            rootElement: this._element.parentNode,
            clickCallback: isVisible ? clickCallback : null
        });
    }

    _initializeFocusTrap() {
        return new FocusTrap({
            trapElement: this._element
        });
    }

    _addEventListeners() {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
            if (event.key !== ESCAPE_KEY) {
            return;
        }

        if (!this._config.keyboard) {
            EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
            return;
        }

        this.hide();
    });
    } // Static


    static jQueryInterface(config) {
        return this.each(function () {
            const data = Offcanvas.getOrCreateInstance(this, config);

            if (typeof config !== 'string') {
                return;
            }

            if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                throw new TypeError(`No method named "${config}"`);
            }

            data[config](this);
        });
    }

}
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
    }

    if (isDisabled(this)) {
        return;
    }

    EventHandler.one(target, EVENT_HIDDEN$3, () => {
        // focus on trigger when it is closed
        if (isVisible(this)) {
        this.focus();
    }
}); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

    if (alreadyOpen && alreadyOpen !== target) {
        Offcanvas.getInstance(alreadyOpen).hide();
    }

    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
    Offcanvas.getOrCreateInstance(selector).show();
}
});
EventHandler.on(window, EVENT_RESIZE, () => {
    for (const element of SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')) {
    if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
    }
}
});
enableDismissTrigger(Offcanvas);


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
 */

const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
 */

const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attributeName)) {
        if (uriAttributes.has(attributeName)) {
            return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
        }

        return true;
    } // Check if a regular expression validates the attribute.


    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
};

const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
        return unsafeHtml;
    }

    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
        return sanitizeFunction(unsafeHtml);
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

    for (const element of elements) {
        const elementName = element.nodeName.toLowerCase();

        if (!Object.keys(allowList).includes(elementName)) {
            element.remove();
            continue;
        }

        const attributeList = [].concat(...element.attributes);
        const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);

        for (const attribute of attributeList) {
            if (!allowedAttribute(attribute, allowedAttributes)) {
                element.removeAttribute(attribute.nodeName);
            }
        }
    }

    return createdDocument.body.innerHTML;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/template-factory.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$5 = 'TemplateFactory';
const Default$4 = {
    allowList: DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
};
const DefaultType$4 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
};
const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
};
/**
 * Class definition
 */

class TemplateFactory extends Config {
    constructor(config) {
        super();
        this._config = this._getConfig(config);
    } // Getters

    static get Default() {
        return Default$4;
    }
    static get DefaultType() {
        return DefaultType$4;
    }
    static get NAME() {
        return NAME$5;
    } // Public

    getContent() {
        return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }
    hasContent() {
        return this.getContent().length > 0;
    }
    changeContent(content) {
        this._checkContent(content);
        this._config.content = _objectSpread(_objectSpread({}, this._config.content), content);
        return this;
    }
    toHtml() {
        const templateWrapper = document.createElement('div');
        templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
        for (const [selector, text] of Object.entries(this._config.content)) {
            this._setContent(templateWrapper, text, selector);
        }
        const template = templateWrapper.children[0];
        const extraClass = this._resolvePossibleFunction(this._config.extraClass);
        if (extraClass) {
            template.classList.add(...extraClass.split(' '));
        }
        return template;
    } // Private

    _typeCheckConfig(config) {
        super._typeCheckConfig(config);
        this._checkContent(config.content);
    }
    _checkContent(arg) {
        for (const [selector, content] of Object.entries(arg)) {
            super._typeCheckConfig({
                selector,
                entry: content
            }, DefaultContentType);
        }
    }
    _setContent(template, content, selector) {
        const templateElement = SelectorEngine.findOne(selector, template);
        if (!templateElement) {
            return;
        }
        content = this._resolvePossibleFunction(content);
        if (!content) {
            templateElement.remove();
            return;
        }
        if (isElement(content)) {
            this._putElementInTemplate(getElement(content), templateElement);
            return;
        }
        if (this._config.html) {
            templateElement.innerHTML = this._maybeSanitize(content);
            return;
        }
        templateElement.textContent = content;
    }
    _maybeSanitize(arg) {
        return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
    _resolvePossibleFunction(arg) {
        return typeof arg === 'function' ? arg(this) : arg;
    }
    _putElementInTemplate(element, templateElement) {
        if (this._config.html) {
            templateElement.innerHTML = '';
            templateElement.append(element);
            return;
        }
        templateElement.textContent = element.textContent;
    }
}



/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$2 = 'scrollspy';
const DATA_KEY$2 = 'bs.scrollspy';
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY = '.data-api';
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_CLICK = `click${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
const CLASS_NAME_ACTIVE$1 = 'active';
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_TARGET_LINKS = '[href]';
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
const SELECTOR_NAV_LINKS = '.nav-link';
const SELECTOR_NAV_ITEMS = '.nav-item';
const SELECTOR_LIST_ITEMS = '.list-group-item';
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
const SELECTOR_DROPDOWN = '.dropdown';
const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
const Default$1 = {
    offset: null,
    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: '0px 0px -25%',
    smoothScroll: false,
    target: null
};
const DefaultType$1 = {
    offset: '(number|null)',
    // TODO v6 @deprecated, keep it for backwards compatibility reasons
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element'
};
/**
 * Class definition
 */

class ScrollSpy extends BaseComponent {
    constructor(element, config) {
        super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

        this._targetLinks = new Map();
        this._observableSections = new Map();
        this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
        this._activeTarget = null;
        this._observer = null;
        this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0
        };
        this.refresh(); // initialize
    } // Getters


    static get Default() {
        return Default$1;
    }

    static get DefaultType() {
        return DefaultType$1;
    }

    static get NAME() {
        return NAME$2;
    } // Public


    refresh() {
        this._initializeTargetsAndObservables();

        this._maybeEnableSmoothScroll();

        if (this._observer) {
            this._observer.disconnect();
        } else {
            this._observer = this._getNewObserver();
        }

        for (const section of this._observableSections.values()) {
            this._observer.observe(section);
        }
    }

    dispose() {
        this._observer.disconnect();

        super.dispose();
    } // Private


    _configAfterMerge(config) {
        // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
        config.target = getElement(config.target) || document.body;
        return config;
    }

    _maybeEnableSmoothScroll() {
        if (!this._config.smoothScroll) {
            return;
        } // unregister any previous listeners


        EventHandler.off(this._config.target, EVENT_CLICK);
        EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
            const observableSection = this._observableSections.get(event.target.hash);

        if (observableSection) {
            event.preventDefault();
            const root = this._rootElement || window;
            const height = observableSection.offsetTop - this._element.offsetTop;

            if (root.scrollTo) {
                root.scrollTo({
                    top: height,
                    behavior: 'smooth'
                });
                return;
            } // Chrome 60 doesn't support `scrollTo`


            root.scrollTop = height;
        }
    });
    }

    _getNewObserver() {
        const options = {
            root: this._rootElement,
            threshold: [0.1, 0.5, 1],
            rootMargin: this._getRootMargin()
        };
        return new IntersectionObserver(entries => this._observerCallback(entries), options);
    } // The logic of selection


    _observerCallback(entries) {
        const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);

        const activate = entry => {
            this._previousScrollData.visibleEntryTop = entry.target.offsetTop;

            this._process(targetElement(entry));
        };

        const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
        const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = parentScrollTop;

        for (const entry of entries) {
            if (!entry.isIntersecting) {
                this._activeTarget = null;

                this._clearActiveClass(targetElement(entry));

                continue;
            }

            const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

            if (userScrollsDown && entryIsLowerThanPrevious) {
                activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

                if (!parentScrollTop) {
                    return;
                }

                continue;
            } // if we are scrolling up, pick the smallest offsetTop


            if (!userScrollsDown && !entryIsLowerThanPrevious) {
                activate(entry);
            }
        }
    } // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only


    _getRootMargin() {
        return this._config.offset ? `${this._config.offset}px 0px -30%` : this._config.rootMargin;
    }

    _initializeTargetsAndObservables() {
        this._targetLinks = new Map();
        this._observableSections = new Map();
        const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);

        for (const anchor of targetLinks) {
            // ensure that the anchor has an id and is not disabled
            if (!anchor.hash || isDisabled(anchor)) {
                continue;
            }

            const observableSection = SelectorEngine.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

            if (isVisible(observableSection)) {
                this._targetLinks.set(anchor.hash, anchor);

                this._observableSections.set(anchor.hash, observableSection);
            }
        }
    }

    _process(target) {
        if (this._activeTarget === target) {
            return;
        }

        this._clearActiveClass(this._config.target);

        this._activeTarget = target;
        target.classList.add(CLASS_NAME_ACTIVE$1);

        this._activateParents(target);

        EventHandler.trigger(this._element, EVENT_ACTIVATE, {
            relatedTarget: target
        });
    }

    _activateParents(target) {
        // Activate dropdown parents
        if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
            SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
            return;
        }

        for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
            // Set triggered links parents as active
            // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
            for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
                item.classList.add(CLASS_NAME_ACTIVE$1);
            }
        }
    }

    _clearActiveClass(parent) {
        parent.classList.remove(CLASS_NAME_ACTIVE$1);
        const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);

        for (const node of activeNodes) {
            node.classList.remove(CLASS_NAME_ACTIVE$1);
        }
    } // Static


    static jQueryInterface(config) {
        return this.each(function () {
            const data = ScrollSpy.getOrCreateInstance(this, config);

            if (typeof config !== 'string') {
                return;
            }

            if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                throw new TypeError(`No method named "${config}"`);
            }

            data[config]();
        });
    }

}
/**
 * Data API implementation
 */


EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
    for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
    ScrollSpy.getOrCreateInstance(spy);
}
});


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME$1 = 'tab';
const DATA_KEY$1 = 'bs.tab';
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE$1 = 'fade';
const CLASS_NAME_SHOW$1 = 'show';
const CLASS_DROPDOWN = 'dropdown';
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
const SELECTOR_DROPDOWN_ITEM = '.dropdown-item';
const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
const SELECTOR_OUTER = '.nav-item, .list-group-item';
const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
/**
 * Class definition
 */

class Tab extends BaseComponent {
    constructor(element) {
        super(element);
        this._parent = this._element.closest(SELECTOR_TAB_PANEL);

        if (!this._parent) {
            return; // todo: should Throw exception on v6
            // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
        } // Set up initial aria attributes


        this._setInitialAttributes(this._parent, this._getChildren());

        EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    } // Getters


    static get NAME() {
        return NAME$1;
    } // Public


    show() {
        // Shows this elem and deactivate the active sibling if exists
        const innerElem = this._element;

        if (this._elemIsActive(innerElem)) {
            return;
        } // Search for active tab on same parent to deactivate it


        const active = this._getActiveElem();

        const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
            relatedTarget: innerElem
        }) : null;
        const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
            relatedTarget: active
        });

        if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
            return;
        }

        this._deactivate(active, innerElem);

        this._activate(innerElem, active);
    } // Private


    _activate(element, relatedElem) {
        if (!element) {
            return;
        }

        element.classList.add(CLASS_NAME_ACTIVE);

        this._activate(getElementFromSelector(element)); // Search and activate/show the proper section


        const complete = () => {
            if (element.getAttribute('role') !== 'tab') {
                element.classList.add(CLASS_NAME_SHOW$1);
                return;
            }

            element.focus();
            element.removeAttribute('tabindex');
            element.setAttribute('aria-selected', true);

            this._toggleDropDown(element, true);

            EventHandler.trigger(element, EVENT_SHOWN$1, {
                relatedTarget: relatedElem
            });
        };

        this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }

    _deactivate(element, relatedElem) {
        if (!element) {
            return;
        }

        element.classList.remove(CLASS_NAME_ACTIVE);
        element.blur();

        this._deactivate(getElementFromSelector(element)); // Search and deactivate the shown section too


        const complete = () => {
            if (element.getAttribute('role') !== 'tab') {
                element.classList.remove(CLASS_NAME_SHOW$1);
                return;
            }

            element.setAttribute('aria-selected', false);
            element.setAttribute('tabindex', '-1');

            this._toggleDropDown(element, false);

            EventHandler.trigger(element, EVENT_HIDDEN$1, {
                relatedTarget: relatedElem
            });
        };

        this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }

    _keydown(event) {
        if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
            return;
        }

        event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

        event.preventDefault();
        const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
        const nextActiveElement = getNextActiveElement(this._getChildren().filter(element => !isDisabled(element)), event.target, isNext, true);

        if (nextActiveElement) {
            Tab.getOrCreateInstance(nextActiveElement).show();
        }
    }

    _getChildren() {
        // collection of inner elements
        return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }

    _getActiveElem() {
        return this._getChildren().find(child => this._elemIsActive(child)) || null;
    }

    _setInitialAttributes(parent, children) {
        this._setAttributeIfNotExists(parent, 'role', 'tablist');

        for (const child of children) {
            this._setInitialAttributesOnChild(child);
        }
    }

    _setInitialAttributesOnChild(child) {
        child = this._getInnerElement(child);

        const isActive = this._elemIsActive(child);

        const outerElem = this._getOuterElement(child);

        child.setAttribute('aria-selected', isActive);

        if (outerElem !== child) {
            this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
        }

        if (!isActive) {
            child.setAttribute('tabindex', '-1');
        }

        this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too


        this._setInitialAttributesOnTargetPanel(child);
    }

    _setInitialAttributesOnTargetPanel(child) {
        const target = getElementFromSelector(child);

        if (!target) {
            return;
        }

        this._setAttributeIfNotExists(target, 'role', 'tabpanel');

        if (child.id) {
            this._setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
        }
    }

    _toggleDropDown(element, open) {
        const outerElem = this._getOuterElement(element);

        if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
            return;
        }

        const toggle = (selector, className) => {
            const element = SelectorEngine.findOne(selector, outerElem);

            if (element) {
                element.classList.toggle(className, open);
            }
        };

        toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
        toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
        toggle(SELECTOR_DROPDOWN_ITEM, CLASS_NAME_ACTIVE);
        outerElem.setAttribute('aria-expanded', open);
    }

    _setAttributeIfNotExists(element, attribute, value) {
        if (!element.hasAttribute(attribute)) {
            element.setAttribute(attribute, value);
        }
    }

    _elemIsActive(elem) {
        return elem.classList.contains(CLASS_NAME_ACTIVE);
    } // Try to get the inner element (usually the .nav-link)


    _getInnerElement(elem) {
        return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    } // Try to get the outer element (usually the .nav-item)


    _getOuterElement(elem) {
        return elem.closest(SELECTOR_OUTER) || elem;
    } // Static


    static jQueryInterface(config) {
        return this.each(function () {
            const data = Tab.getOrCreateInstance(this);

            if (typeof config !== 'string') {
                return;
            }

            if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                throw new TypeError(`No method named "${config}"`);
            }

            data[config]();
        });
    }

}
/**
 * Data API implementation
 */


EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
    }

    if (isDisabled(this)) {
        return;
    }

    Tab.getOrCreateInstance(this).show();
});
/**
 * Initialize on focus
 */

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    Tab.getOrCreateInstance(element);
}
});


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */

const NAME = 'toast';
const DATA_KEY = 'bs.toast';
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';
const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
};
const Default = {
    animation: true,
    autohide: true,
    delay: 5000
};
/**
 * Class definition
 */

class Toast extends BaseComponent {
    constructor(element, config) {
        super(element, config);
        this._timeout = null;
        this._hasMouseInteraction = false;
        this._hasKeyboardInteraction = false;

        this._setListeners();
    } // Getters


    static get Default() {
        return Default;
    }

    static get DefaultType() {
        return DefaultType;
    }

    static get NAME() {
        return NAME;
    } // Public


    show() {
        const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

        if (showEvent.defaultPrevented) {
            return;
        }

        this._clearTimeout();

        if (this._config.animation) {
            this._element.classList.add(CLASS_NAME_FADE);
        }

        const complete = () => {
            this._element.classList.remove(CLASS_NAME_SHOWING);

            EventHandler.trigger(this._element, EVENT_SHOWN);

            this._maybeScheduleHide();
        };

        this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


        reflow(this._element);

        this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);

        this._queueCallback(complete, this._element, this._config.animation);
    }

    hide() {
        if (!this.isShown()) {
            return;
        }

        const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

        if (hideEvent.defaultPrevented) {
            return;
        }

        const complete = () => {
            this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


            this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);

            EventHandler.trigger(this._element, EVENT_HIDDEN);
        };

        this._element.classList.add(CLASS_NAME_SHOWING);

        this._queueCallback(complete, this._element, this._config.animation);
    }

    dispose() {
        this._clearTimeout();

        if (this.isShown()) {
            this._element.classList.remove(CLASS_NAME_SHOW);
        }

        super.dispose();
    }

    isShown() {
        return this._element.classList.contains(CLASS_NAME_SHOW);
    } // Private


    _maybeScheduleHide() {
        if (!this._config.autohide) {
            return;
        }

        if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
            return;
        }

        this._timeout = setTimeout(() => {
                this.hide();
    }, this._config.delay);
    }

    _onInteraction(event, isInteracting) {
        switch (event.type) {
            case 'mouseover':
            case 'mouseout':
                this._hasMouseInteraction = isInteracting;
                break;

            case 'focusin':
            case 'focusout':
                this._hasKeyboardInteraction = isInteracting;
                break;
        }

        if (isInteracting) {
            this._clearTimeout();

            return;
        }

        const nextElement = event.relatedTarget;

        if (this._element === nextElement || this._element.contains(nextElement)) {
            return;
        }

        this._maybeScheduleHide();
    }

    _setListeners() {
        EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
        EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
        EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
        EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }

    _clearTimeout() {
        clearTimeout(this._timeout);
        this._timeout = null;
    } // Static


    static jQueryInterface(config) {
        return this.each(function () {
            const data = Toast.getOrCreateInstance(this, config);

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError(`No method named "${config}"`);
                }

                data[config](this);
            }
        });
    }

}
/**
 * Data API implementation
 */


enableDismissTrigger(Toast);


Bootstrap.Carousel = Carousel;
Bootstrap.Alert = Alert;
Bootstrap.Button = Button;
Bootstrap.Carousel = Carousel;
Bootstrap.Collapse = Collapse;
Bootstrap.Modal = Modal;
Bootstrap.Offcanvas = Offcanvas;
Bootstrap.ScrollSpy = ScrollSpy;
Bootstrap.Tab = Tab;
Bootstrap.Toast = Toast;



