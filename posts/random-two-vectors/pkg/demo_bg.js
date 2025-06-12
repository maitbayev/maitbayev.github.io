let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


function isLikeNone(x) {
    return x === undefined || x === null;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_1.set(idx, obj);
    return idx;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_6.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

export function run_web() {
    wasm.run_web();
}

function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm.closure2389_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_35(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbbcec8f7d18eb270(arg0, arg1);
}

function __wbg_adapter_50(arg0, arg1, arg2, arg3) {
    wasm.closure2394_externref_shim(arg0, arg1, arg2, arg3);
}

function __wbg_adapter_53(arg0, arg1, arg2) {
    wasm.closure2559_externref_shim(arg0, arg1, arg2);
}

const __wbindgen_enum_GpuBlendFactor = ["zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha"];

const __wbindgen_enum_GpuBlendOperation = ["add", "subtract", "reverse-subtract", "min", "max"];

const __wbindgen_enum_GpuBufferBindingType = ["uniform", "storage", "read-only-storage"];

const __wbindgen_enum_GpuCanvasAlphaMode = ["opaque", "premultiplied"];

const __wbindgen_enum_GpuCompareFunction = ["never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"];

const __wbindgen_enum_GpuCullMode = ["none", "front", "back"];

const __wbindgen_enum_GpuFrontFace = ["ccw", "cw"];

const __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"];

const __wbindgen_enum_GpuLoadOp = ["load", "clear"];

const __wbindgen_enum_GpuPowerPreference = ["low-power", "high-performance"];

const __wbindgen_enum_GpuPrimitiveTopology = ["point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"];

const __wbindgen_enum_GpuSamplerBindingType = ["filtering", "non-filtering", "comparison"];

const __wbindgen_enum_GpuStencilOperation = ["keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"];

const __wbindgen_enum_GpuStorageTextureAccess = ["write-only", "read-only", "read-write"];

const __wbindgen_enum_GpuStoreOp = ["store", "discard"];

const __wbindgen_enum_GpuTextureAspect = ["all", "stencil-only", "depth-only"];

const __wbindgen_enum_GpuTextureDimension = ["1d", "2d", "3d"];

const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];

const __wbindgen_enum_GpuTextureSampleType = ["float", "unfilterable-float", "depth", "sint", "uint"];

const __wbindgen_enum_GpuTextureViewDimension = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"];

const __wbindgen_enum_GpuVertexFormat = ["uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra"];

const __wbindgen_enum_GpuVertexStepMode = ["vertex", "instance"];

const __wbindgen_enum_ResizeObserverBoxOptions = ["border-box", "content-box", "device-pixel-content-box"];

const __wbindgen_enum_VisibilityState = ["hidden", "visible"];

export function __wbg_Window_930673242d8411f8(arg0) {
    const ret = arg0.Window;
    return ret;
};

export function __wbg_Window_9e7ea8667e28eb00(arg0) {
    const ret = arg0.Window;
    return ret;
};

export function __wbg_WorkerGlobalScope_0169ffb9adb5f5ef(arg0) {
    const ret = arg0.WorkerGlobalScope;
    return ret;
};

export function __wbg_abort_775ef1d17fc65868(arg0) {
    arg0.abort();
};

export function __wbg_activeElement_367599fdfa7ad115(arg0) {
    const ret = arg0.activeElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_activeTexture_0f19d8acfa0a14c2(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
};

export function __wbg_activeTexture_460f2e367e813fb0(arg0, arg1) {
    arg0.activeTexture(arg1 >>> 0);
};

export function __wbg_addEventListener_90e553fdce254421() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_addListener_2982bb811b6385c5() { return handleError(function (arg0, arg1) {
    arg0.addListener(arg1);
}, arguments) };

export function __wbg_altKey_c33c03aed82e4275(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_altKey_d7495666df921121(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_animate_c6fe7566daf35422(arg0, arg1, arg2) {
    const ret = arg0.animate(arg1, arg2);
    return ret;
};

export function __wbg_appendChild_8204974b7328bf98() { return handleError(function (arg0, arg1) {
    const ret = arg0.appendChild(arg1);
    return ret;
}, arguments) };

export function __wbg_attachShader_3d4eb6af9e3e7bd1(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
};

export function __wbg_attachShader_94e758c8b5283eb2(arg0, arg1, arg2) {
    arg0.attachShader(arg1, arg2);
};

export function __wbg_beginQuery_6af0b28414b16c07(arg0, arg1, arg2) {
    arg0.beginQuery(arg1 >>> 0, arg2);
};

export function __wbg_beginRenderPass_aefd0d9681a1f010() { return handleError(function (arg0, arg1) {
    const ret = arg0.beginRenderPass(arg1);
    return ret;
}, arguments) };

export function __wbg_bindAttribLocation_40da4b3e84cc7bd5(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindAttribLocation_ce2730e29976d230(arg0, arg1, arg2, arg3, arg4) {
    arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
};

export function __wbg_bindBufferRange_454f90f2b1781982(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.bindBufferRange(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_bindBuffer_309c9a6c21826cf5(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindBuffer_f32f587f1c2962a7(arg0, arg1, arg2) {
    arg0.bindBuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindFramebuffer_bd02c8cc707d670f(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindFramebuffer_e48e83c0f973944d(arg0, arg1, arg2) {
    arg0.bindFramebuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindRenderbuffer_53eedd88e52b4cb5(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindRenderbuffer_55e205fecfddbb8c(arg0, arg1, arg2) {
    arg0.bindRenderbuffer(arg1 >>> 0, arg2);
};

export function __wbg_bindSampler_9f59cf2eaa22eee0(arg0, arg1, arg2) {
    arg0.bindSampler(arg1 >>> 0, arg2);
};

export function __wbg_bindTexture_a6e795697f49ebd1(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
};

export function __wbg_bindTexture_bc8eb316247f739d(arg0, arg1, arg2) {
    arg0.bindTexture(arg1 >>> 0, arg2);
};

export function __wbg_bindVertexArrayOES_da8e7059b789629e(arg0, arg1) {
    arg0.bindVertexArrayOES(arg1);
};

export function __wbg_bindVertexArray_6b4b88581064b71f(arg0, arg1) {
    arg0.bindVertexArray(arg1);
};

export function __wbg_blendColor_15ba1eff44560932(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendColor_6446fba673f64ff0(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendColor(arg1, arg2, arg3, arg4);
};

export function __wbg_blendEquationSeparate_c1aa26a9a5c5267e(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendEquationSeparate_f3d422e981d86339(arg0, arg1, arg2) {
    arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendEquation_c23d111ad6d268ff(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
};

export function __wbg_blendEquation_cec7bc41f3e5704c(arg0, arg1) {
    arg0.blendEquation(arg1 >>> 0);
};

export function __wbg_blendFuncSeparate_483be8d4dd635340(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_blendFuncSeparate_dafeabfc1680b2ee(arg0, arg1, arg2, arg3, arg4) {
    arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_blendFunc_9454884a3cfd2911(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blendFunc_c3b74be5a39c665f(arg0, arg1, arg2) {
    arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_blitFramebuffer_7303bdff77cfe967(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
};

export function __wbg_blockSize_1490803190b57a34(arg0) {
    const ret = arg0.blockSize;
    return ret;
};

export function __wbg_body_942ea927546a04ba(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_brand_0d0be99ea957c63c(arg0, arg1) {
    const ret = arg1.brand;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_brands_f09f6c82504b5473(arg0) {
    const ret = arg0.brands;
    return ret;
};

export function __wbg_bufferData_3261d3e1dd6fc903(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_33c59bf909ea6fd3(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_463178757784fcac(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferData_d99b6b4eb5283f20(arg0, arg1, arg2, arg3) {
    arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
};

export function __wbg_bufferSubData_4e973eefe9236d04(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_bufferSubData_dcd4d16031a60345(arg0, arg1, arg2, arg3) {
    arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_buffer_09165b52af8c5237(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_buffer_609cc3eee51ed158(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_button_f75c56aec440ea04(arg0) {
    const ret = arg0.button;
    return ret;
};

export function __wbg_buttons_b6346af6f04e4686(arg0) {
    const ret = arg0.buttons;
    return ret;
};

export function __wbg_call_672a4d21634d4a24() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

export function __wbg_cancelAnimationFrame_089b48301c362fde() { return handleError(function (arg0, arg1) {
    arg0.cancelAnimationFrame(arg1);
}, arguments) };

export function __wbg_cancelIdleCallback_669eb1ed294c8b8b(arg0, arg1) {
    arg0.cancelIdleCallback(arg1 >>> 0);
};

export function __wbg_cancel_2a516934f42e16f2(arg0) {
    arg0.cancel();
};

export function __wbg_catch_a6e601879b2610e9(arg0, arg1) {
    const ret = arg0.catch(arg1);
    return ret;
};

export function __wbg_clearBufferfv_65ea413f7f2554a2(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferiv_c003c27b77a0245b(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
};

export function __wbg_clearBufferuiv_8c285072f2026a37(arg0, arg1, arg2, arg3, arg4) {
    arg0.clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
};

export function __wbg_clearDepth_17cfee5be8476fae(arg0, arg1) {
    arg0.clearDepth(arg1);
};

export function __wbg_clearDepth_670d19914a501259(arg0, arg1) {
    arg0.clearDepth(arg1);
};

export function __wbg_clearStencil_4323424f1acca0df(arg0, arg1) {
    arg0.clearStencil(arg1);
};

export function __wbg_clearStencil_7addd3b330b56b27(arg0, arg1) {
    arg0.clearStencil(arg1);
};

export function __wbg_clearTimeout_b2651b7485c58446(arg0, arg1) {
    arg0.clearTimeout(arg1);
};

export function __wbg_clear_62b9037b892f6988(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
};

export function __wbg_clear_f8d5f3c348d37d95(arg0, arg1) {
    arg0.clear(arg1 >>> 0);
};

export function __wbg_clientWaitSync_6930890a42bd44c0(arg0, arg1, arg2, arg3) {
    const ret = arg0.clientWaitSync(arg1, arg2 >>> 0, arg3 >>> 0);
    return ret;
};

export function __wbg_close_414b379454494b29(arg0) {
    arg0.close();
};

export function __wbg_code_459c120478e1ab6e(arg0, arg1) {
    const ret = arg1.code;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_colorMask_5e7c60b9c7a57a2e(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_colorMask_6dac12039c7145ae(arg0, arg1, arg2, arg3, arg4) {
    arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
};

export function __wbg_compileShader_0ad770bbdbb9de21(arg0, arg1) {
    arg0.compileShader(arg1);
};

export function __wbg_compileShader_2307c9d370717dd5(arg0, arg1) {
    arg0.compileShader(arg1);
};

export function __wbg_compressedTexSubImage2D_71877eec950ca069(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
};

export function __wbg_compressedTexSubImage2D_99abf4cfdb7c3fd8(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
};

export function __wbg_compressedTexSubImage2D_d66dcfcb2422e703(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
};

export function __wbg_compressedTexSubImage3D_58506392da46b927(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
};

export function __wbg_compressedTexSubImage3D_81477746675a4017(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
};

export function __wbg_configure_86dd92dde48d105a() { return handleError(function (arg0, arg1) {
    arg0.configure(arg1);
}, arguments) };

export function __wbg_contains_3361c7eda6c95afd(arg0, arg1) {
    const ret = arg0.contains(arg1);
    return ret;
};

export function __wbg_contentRect_81407eb60e52248f(arg0) {
    const ret = arg0.contentRect;
    return ret;
};

export function __wbg_copyBufferSubData_9469a965478e33b5(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_copyTexSubImage2D_05e7e8df6814a705(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_copyTexSubImage2D_607ad28606952982(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
    arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
};

export function __wbg_copyTexSubImage3D_32e92c94044e58ca(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

export function __wbg_createBindGroupLayout_f0635625a1a82bea() { return handleError(function (arg0, arg1) {
    const ret = arg0.createBindGroupLayout(arg1);
    return ret;
}, arguments) };

export function __wbg_createBindGroup_043b06d20124f91e(arg0, arg1) {
    const ret = arg0.createBindGroup(arg1);
    return ret;
};

export function __wbg_createBuffer_086a8bb05ced884a() { return handleError(function (arg0, arg1) {
    const ret = arg0.createBuffer(arg1);
    return ret;
}, arguments) };

export function __wbg_createBuffer_7a9ec3d654073660(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createBuffer_9886e84a67b68c89(arg0) {
    const ret = arg0.createBuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createCommandEncoder_aa9ae9d445bb7abf(arg0, arg1) {
    const ret = arg0.createCommandEncoder(arg1);
    return ret;
};

export function __wbg_createElement_8c9931a732ee2fea() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments) };

export function __wbg_createFramebuffer_7824f69bba778885(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createFramebuffer_c8d70ebc4858051e(arg0) {
    const ret = arg0.createFramebuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createObjectURL_6e98d2f9c7bd9764() { return handleError(function (arg0, arg1) {
    const ret = URL.createObjectURL(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_createPipelineLayout_5cc7e994e46201c7(arg0, arg1) {
    const ret = arg0.createPipelineLayout(arg1);
    return ret;
};

export function __wbg_createProgram_8ff56c485f3233d0(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createProgram_da203074cafb1038(arg0) {
    const ret = arg0.createProgram();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createQuery_5ed5e770ec1009c1(arg0) {
    const ret = arg0.createQuery();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createRenderPipeline_47152f2f57b11194() { return handleError(function (arg0, arg1) {
    const ret = arg0.createRenderPipeline(arg1);
    return ret;
}, arguments) };

export function __wbg_createRenderbuffer_d88aa9403faa38ea(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createRenderbuffer_fd347ae14f262eaa(arg0) {
    const ret = arg0.createRenderbuffer();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createSampler_f76e29d7522bec9e(arg0) {
    const ret = arg0.createSampler();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createShaderModule_9ec201507fe4949e(arg0, arg1) {
    const ret = arg0.createShaderModule(arg1);
    return ret;
};

export function __wbg_createShader_4a256a8cc9c1ce4f(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createShader_983150fb1243ee56(arg0, arg1) {
    const ret = arg0.createShader(arg1 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_09f18232c5ad6e69() { return handleError(function (arg0, arg1) {
    const ret = arg0.createTexture(arg1);
    return ret;
}, arguments) };

export function __wbg_createTexture_9c536c79b635fdef(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createTexture_bfaa54c0cd22e367(arg0) {
    const ret = arg0.createTexture();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createVertexArrayOES_991b44f100f93329(arg0) {
    const ret = arg0.createVertexArrayOES();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createVertexArray_e435029ae2660efd(arg0) {
    const ret = arg0.createVertexArray();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_createView_f7cd0a0356a46f3b() { return handleError(function (arg0, arg1) {
    const ret = arg0.createView(arg1);
    return ret;
}, arguments) };

export function __wbg_ctrlKey_1e826e468105ac11(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_ctrlKey_cdbe8154dfb00d1f(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_cullFace_187079e6e20a464d(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
};

export function __wbg_cullFace_fbae6dd4d5e61ba4(arg0, arg1) {
    arg0.cullFace(arg1 >>> 0);
};

export function __wbg_debug_3cb59063b29f58c1(arg0) {
    console.debug(arg0);
};

export function __wbg_deleteBuffer_7ed96e1bf7c02e87(arg0, arg1) {
    arg0.deleteBuffer(arg1);
};

export function __wbg_deleteBuffer_a7822433fc95dfb8(arg0, arg1) {
    arg0.deleteBuffer(arg1);
};

export function __wbg_deleteFramebuffer_66853fb7101488cb(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
};

export function __wbg_deleteFramebuffer_cd3285ee5a702a7a(arg0, arg1) {
    arg0.deleteFramebuffer(arg1);
};

export function __wbg_deleteProgram_3fa626bbc0001eb7(arg0, arg1) {
    arg0.deleteProgram(arg1);
};

export function __wbg_deleteProgram_71a133c6d053e272(arg0, arg1) {
    arg0.deleteProgram(arg1);
};

export function __wbg_deleteQuery_6a2b7cd30074b20b(arg0, arg1) {
    arg0.deleteQuery(arg1);
};

export function __wbg_deleteRenderbuffer_59f4369653485031(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
};

export function __wbg_deleteRenderbuffer_8808192853211567(arg0, arg1) {
    arg0.deleteRenderbuffer(arg1);
};

export function __wbg_deleteSampler_7f02bb003ba547f0(arg0, arg1) {
    arg0.deleteSampler(arg1);
};

export function __wbg_deleteShader_8d42f169deda58ac(arg0, arg1) {
    arg0.deleteShader(arg1);
};

export function __wbg_deleteShader_c65a44796c5004d8(arg0, arg1) {
    arg0.deleteShader(arg1);
};

export function __wbg_deleteSync_5a3fbe5d6b742398(arg0, arg1) {
    arg0.deleteSync(arg1);
};

export function __wbg_deleteTexture_a30f5ca0163c4110(arg0, arg1) {
    arg0.deleteTexture(arg1);
};

export function __wbg_deleteTexture_bb82c9fec34372ba(arg0, arg1) {
    arg0.deleteTexture(arg1);
};

export function __wbg_deleteVertexArrayOES_1ee7a06a4b23ec8c(arg0, arg1) {
    arg0.deleteVertexArrayOES(arg1);
};

export function __wbg_deleteVertexArray_77fe73664a3332ae(arg0, arg1) {
    arg0.deleteVertexArray(arg1);
};

export function __wbg_deltaMode_9bfd9fe3f6b4b240(arg0) {
    const ret = arg0.deltaMode;
    return ret;
};

export function __wbg_deltaX_5c1121715746e4b7(arg0) {
    const ret = arg0.deltaX;
    return ret;
};

export function __wbg_deltaY_f9318542caea0c36(arg0) {
    const ret = arg0.deltaY;
    return ret;
};

export function __wbg_depthFunc_2906916f4536d5d7(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
};

export function __wbg_depthFunc_f34449ae87cc4e3e(arg0, arg1) {
    arg0.depthFunc(arg1 >>> 0);
};

export function __wbg_depthMask_5fe84e2801488eda(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
};

export function __wbg_depthMask_76688a8638b2f321(arg0, arg1) {
    arg0.depthMask(arg1 !== 0);
};

export function __wbg_depthRange_3cd6b4dc961d9116(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
};

export function __wbg_depthRange_f9c084ff3d81fd7b(arg0, arg1, arg2) {
    arg0.depthRange(arg1, arg2);
};

export function __wbg_devicePixelContentBoxSize_a6de82cb30d70825(arg0) {
    const ret = arg0.devicePixelContentBoxSize;
    return ret;
};

export function __wbg_devicePixelRatio_68c391265f05d093(arg0) {
    const ret = arg0.devicePixelRatio;
    return ret;
};

export function __wbg_disableVertexAttribArray_452cc9815fced7e4(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_disableVertexAttribArray_afd097fb465dc100(arg0, arg1) {
    arg0.disableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_disable_2702df5b5da5dd21(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
};

export function __wbg_disable_8b53998501a7a85b(arg0, arg1) {
    arg0.disable(arg1 >>> 0);
};

export function __wbg_disconnect_2118016d75479985(arg0) {
    arg0.disconnect();
};

export function __wbg_disconnect_ac3f4ba550970c76(arg0) {
    arg0.disconnect();
};

export function __wbg_document_d249400bd7bd996d(arg0) {
    const ret = arg0.document;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_drawArraysInstancedANGLE_342ee6b5236d9702(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawArraysInstanced_622ea9f149b0b80c(arg0, arg1, arg2, arg3, arg4) {
    arg0.drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_drawArrays_6acaa2669c105f3a(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawArrays_6d29ea2ebc0c72a2(arg0, arg1, arg2, arg3) {
    arg0.drawArrays(arg1 >>> 0, arg2, arg3);
};

export function __wbg_drawBuffersWEBGL_9fdbdf3d4cbd3aae(arg0, arg1) {
    arg0.drawBuffersWEBGL(arg1);
};

export function __wbg_drawBuffers_e729b75c5a50d760(arg0, arg1) {
    arg0.drawBuffers(arg1);
};

export function __wbg_drawElementsInstancedANGLE_096b48ab8686c5cf(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_drawElementsInstanced_f874e87d0b4e95e9(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_drawIndexed_322c2f9f038d7b23(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
};

export function __wbg_enableVertexAttribArray_607be07574298e5e(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_enableVertexAttribArray_93c3d406a41ad6c7(arg0, arg1) {
    arg0.enableVertexAttribArray(arg1 >>> 0);
};

export function __wbg_enable_51114837e05ee280(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
};

export function __wbg_enable_d183fef39258803f(arg0, arg1) {
    arg0.enable(arg1 >>> 0);
};

export function __wbg_endQuery_17aac36532ca7d47(arg0, arg1) {
    arg0.endQuery(arg1 >>> 0);
};

export function __wbg_end_d54348baf0bf3b70(arg0) {
    arg0.end();
};

export function __wbg_error_1004b8c64097413f(arg0, arg1) {
    console.error(arg0, arg1);
};

export function __wbg_error_524f506f44df1645(arg0) {
    console.error(arg0);
};

export function __wbg_error_7534b8e9a36f1ab4(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbg_fenceSync_02d142d21e315da6(arg0, arg1, arg2) {
    const ret = arg0.fenceSync(arg1 >>> 0, arg2 >>> 0);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_finish_db34a19c90c07af7(arg0) {
    const ret = arg0.finish();
    return ret;
};

export function __wbg_finish_e2d3808af76b422a(arg0, arg1) {
    const ret = arg0.finish(arg1);
    return ret;
};

export function __wbg_flush_4150080f65c49208(arg0) {
    arg0.flush();
};

export function __wbg_flush_987c35de09e06fd6(arg0) {
    arg0.flush();
};

export function __wbg_focus_7d08b55eba7b368d() { return handleError(function (arg0) {
    arg0.focus();
}, arguments) };

export function __wbg_framebufferRenderbuffer_2fdd12e89ad81eb9(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
};

export function __wbg_framebufferRenderbuffer_8b88592753b54715(arg0, arg1, arg2, arg3, arg4) {
    arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
};

export function __wbg_framebufferTexture2D_81a565732bd5d8fe(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
};

export function __wbg_framebufferTexture2D_ed855d0b097c557a(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
};

export function __wbg_framebufferTextureLayer_5e6bd1b0cb45d815(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
};

export function __wbg_framebufferTextureMultiviewOVR_e54f936c3cc382cb(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.framebufferTextureMultiviewOVR(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
};

export function __wbg_frontFace_289c9d7a8569c4f2(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
};

export function __wbg_frontFace_4d4936cfaeb8b7df(arg0, arg1) {
    arg0.frontFace(arg1 >>> 0);
};

export function __wbg_fullscreenElement_a2f691b04c3b3de5(arg0) {
    const ret = arg0.fullscreenElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getBufferSubData_8ab2dcc5fcf5770f(arg0, arg1, arg2, arg3) {
    arg0.getBufferSubData(arg1 >>> 0, arg2, arg3);
};

export function __wbg_getCoalescedEvents_7c0f5fb94594226f(arg0) {
    const ret = arg0.getCoalescedEvents;
    return ret;
};

export function __wbg_getCoalescedEvents_a7d49de30111f6b8(arg0) {
    const ret = arg0.getCoalescedEvents();
    return ret;
};

export function __wbg_getComputedStyle_046dd6472f8e7f1d() { return handleError(function (arg0, arg1) {
    const ret = arg0.getComputedStyle(arg1);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_3ae09aaa73194801() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_e9cf379449413580() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_f65a0debd1e8f8e8() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getContext_fc19859df6331073() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getCurrentTexture_6ee19b05d6ba43ba() { return handleError(function (arg0) {
    const ret = arg0.getCurrentTexture();
    return ret;
}, arguments) };

export function __wbg_getElementById_f827f0d6648718a8(arg0, arg1, arg2) {
    const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getExtension_ff0fb1398bcf28c3() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getIndexedParameter_f9211edc36533919() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getMappedRange_b986a889b6b53379() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getMappedRange(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_getOwnPropertyDescriptor_9dd936a3c0cbd368(arg0, arg1) {
    const ret = Object.getOwnPropertyDescriptor(arg0, arg1);
    return ret;
};

export function __wbg_getParameter_1f0887a2b88e6d19() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getParameter_e3429f024018310f() { return handleError(function (arg0, arg1) {
    const ret = arg0.getParameter(arg1 >>> 0);
    return ret;
}, arguments) };

export function __wbg_getPreferredCanvasFormat_c56b5a9a243fe942(arg0) {
    const ret = arg0.getPreferredCanvasFormat();
    return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
};

export function __wbg_getProgramInfoLog_631c180b1b21c8ed(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getProgramInfoLog_a998105a680059db(arg0, arg1, arg2) {
    const ret = arg1.getProgramInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getProgramParameter_0c411f0cd4185c5b(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getProgramParameter_360f95ff07ac068d(arg0, arg1, arg2) {
    const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getPropertyValue_e623c23a05dfb30c() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_getQueryParameter_8921497e1d1561c1(arg0, arg1, arg2) {
    const ret = arg0.getQueryParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getShaderInfoLog_7e7b38fb910ec534(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getShaderInfoLog_f59c3112acc6e039(arg0, arg1, arg2) {
    const ret = arg1.getShaderInfoLog(arg2);
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getShaderParameter_511b5f929074fa31(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getShaderParameter_6dbe0b8558dc41fd(arg0, arg1, arg2) {
    const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getSupportedExtensions_8c007dbb54905635(arg0) {
    const ret = arg0.getSupportedExtensions();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getSupportedProfiles_10d2a4d32a128384(arg0) {
    const ret = arg0.getSupportedProfiles();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getSyncParameter_7cb8461f5891606c(arg0, arg1, arg2) {
    const ret = arg0.getSyncParameter(arg1, arg2 >>> 0);
    return ret;
};

export function __wbg_getUniformBlockIndex_288fdc31528171ca(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformBlockIndex(arg1, getStringFromWasm0(arg2, arg3));
    return ret;
};

export function __wbg_getUniformLocation_657a2b6d102bd126(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getUniformLocation_838363001c74dc21(arg0, arg1, arg2, arg3) {
    const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_get_b9b93047fe3cf45b(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};

export function __wbg_get_e27dfaeb6f46bd45(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_gpu_1b22165b67dd5a59(arg0) {
    const ret = arg0.gpu;
    return ret;
};

export function __wbg_height_1f8226c8f6875110(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_includes_937486a108ec147b(arg0, arg1, arg2) {
    const ret = arg0.includes(arg1, arg2);
    return ret;
};

export function __wbg_info_3daf2e093e091b66(arg0) {
    console.info(arg0);
};

export function __wbg_inlineSize_8ff96b3ec1b24423(arg0) {
    const ret = arg0.inlineSize;
    return ret;
};

export function __wbg_instanceof_GpuAdapter_331cc7dcda68de8c(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUAdapter;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_GpuCanvasContext_4ea475a10f693c29(arg0) {
    let result;
    try {
        result = arg0 instanceof GPUCanvasContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_HtmlCanvasElement_2ea67072a7624ac5(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLCanvasElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_WebGl2RenderingContext_2b6045efeb76568d(arg0) {
    let result;
    try {
        result = arg0 instanceof WebGL2RenderingContext;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Window_def73ea0955fc569(arg0) {
    let result;
    try {
        result = arg0 instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_invalidateFramebuffer_83f643d2a4936456() { return handleError(function (arg0, arg1, arg2) {
    arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
}, arguments) };

export function __wbg_isIntersecting_e68706dac9c5f2e9(arg0) {
    const ret = arg0.isIntersecting;
    return ret;
};

export function __wbg_is_c7481c65e7e5df9e(arg0, arg1) {
    const ret = Object.is(arg0, arg1);
    return ret;
};

export function __wbg_key_7b5c6cb539be8e13(arg0, arg1) {
    const ret = arg1.key;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_label_7045a786095b1bab(arg0, arg1) {
    const ret = arg1.label;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_length_a446193dc22c12f8(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_length_e2d2a49132c1b256(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_linkProgram_067ee06739bdde81(arg0, arg1) {
    arg0.linkProgram(arg1);
};

export function __wbg_linkProgram_e002979fe36e5b2a(arg0, arg1) {
    arg0.linkProgram(arg1);
};

export function __wbg_location_9b435486be8f98c2(arg0) {
    const ret = arg0.location;
    return ret;
};

export function __wbg_log_c222819a41e063d3(arg0) {
    console.log(arg0);
};

export function __wbg_matchMedia_bf8807a841d930c1() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.matchMedia(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_matches_e9ca73fbf8a3a104(arg0) {
    const ret = arg0.matches;
    return ret;
};

export function __wbg_media_552eec81313ef78b(arg0, arg1) {
    const ret = arg1.media;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_metaKey_0b25f7848e014cc8(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_metaKey_e1dd47d709a80ce5(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_movementX_1aa05f864931369b(arg0) {
    const ret = arg0.movementX;
    return ret;
};

export function __wbg_movementY_8acfedb38a70e624(arg0) {
    const ret = arg0.movementY;
    return ret;
};

export function __wbg_navigator_0a9bf1120e24fec2(arg0) {
    const ret = arg0.navigator;
    return ret;
};

export function __wbg_navigator_1577371c070c8947(arg0) {
    const ret = arg0.navigator;
    return ret;
};

export function __wbg_new_18b1151f3a6a9280() { return handleError(function (arg0) {
    const ret = new IntersectionObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_new_24b2c5b645cded8d() { return handleError(function () {
    const ret = new MessageChannel();
    return ret;
}, arguments) };

export function __wbg_new_405e22f390576ce2() {
    const ret = new Object();
    return ret;
};

export function __wbg_new_5f34cc0c99fcc488() { return handleError(function (arg0) {
    const ret = new ResizeObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_new_78feb108b6472713() {
    const ret = new Array();
    return ret;
};

export function __wbg_new_8a6f238a6ece86ea() {
    const ret = new Error();
    return ret;
};

export function __wbg_new_a12002a7f91c75be(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

export function __wbg_new_b1a33e5095abf678() { return handleError(function (arg0, arg1) {
    const ret = new Worker(getStringFromWasm0(arg0, arg1));
    return ret;
}, arguments) };

export function __wbg_new_e25e5aab09ff45db() { return handleError(function () {
    const ret = new AbortController();
    return ret;
}, arguments) };

export function __wbg_newnoargs_105ed471475aaf50(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_840f3c038856d4e9(arg0, arg1, arg2) {
    const ret = new Int8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_999332a180064b59(arg0, arg1, arg2) {
    const ret = new Int32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_d4a86622320ea258(arg0, arg1, arg2) {
    const ret = new Uint16Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354(arg0, arg1, arg2) {
    const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_f1dead44d1fc7212(arg0, arg1, arg2) {
    const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_f254047f7e80e7ff(arg0, arg1, arg2) {
    const ret = new Int16Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithstrsequenceandoptions_aaff55b467c81b63() { return handleError(function (arg0, arg1) {
    const ret = new Blob(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_now_2c95c9de01293173(arg0) {
    const ret = arg0.now();
    return ret;
};

export function __wbg_observe_d2e7378f15f7ca72(arg0, arg1) {
    arg0.observe(arg1);
};

export function __wbg_observe_eafddfc5a0c60e02(arg0, arg1) {
    arg0.observe(arg1);
};

export function __wbg_observe_ed4adb1c245103c5(arg0, arg1, arg2) {
    arg0.observe(arg1, arg2);
};

export function __wbg_of_2eaf5a02d443ef03(arg0) {
    const ret = Array.of(arg0);
    return ret;
};

export function __wbg_of_66b3ee656cbd962b(arg0, arg1) {
    const ret = Array.of(arg0, arg1);
    return ret;
};

export function __wbg_offsetX_b1b9d9e846d150ae(arg0) {
    const ret = arg0.offsetX;
    return ret;
};

export function __wbg_offsetY_9c341c6a9924f449(arg0) {
    const ret = arg0.offsetY;
    return ret;
};

export function __wbg_performance_7a3ffd0b17f663ad(arg0) {
    const ret = arg0.performance;
    return ret;
};

export function __wbg_persisted_d32ce73b8e522062(arg0) {
    const ret = arg0.persisted;
    return ret;
};

export function __wbg_pixelStorei_6aba5d04cdcaeaf6(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_pixelStorei_c8520e4b46f4a973(arg0, arg1, arg2) {
    arg0.pixelStorei(arg1 >>> 0, arg2);
};

export function __wbg_play_7aa7df4e12b40820(arg0) {
    arg0.play();
};

export function __wbg_pointerId_585e63ee80a49927(arg0) {
    const ret = arg0.pointerId;
    return ret;
};

export function __wbg_pointerType_6bd934aa20d9db49(arg0, arg1) {
    const ret = arg1.pointerType;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_polygonOffset_773fe0017b2c8f51(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
};

export function __wbg_polygonOffset_8c11c066486216c4(arg0, arg1, arg2) {
    arg0.polygonOffset(arg1, arg2);
};

export function __wbg_port1_70af0ea6e4a96f9d(arg0) {
    const ret = arg0.port1;
    return ret;
};

export function __wbg_port2_0584c7f0938b6fe6(arg0) {
    const ret = arg0.port2;
    return ret;
};

export function __wbg_postMessage_e55d059efb191dc5() { return handleError(function (arg0, arg1) {
    arg0.postMessage(arg1);
}, arguments) };

export function __wbg_postMessage_f961e53b9731ca83() { return handleError(function (arg0, arg1, arg2) {
    arg0.postMessage(arg1, arg2);
}, arguments) };

export function __wbg_postTask_62a4b94ee65c66c5(arg0, arg1, arg2) {
    const ret = arg0.postTask(arg1, arg2);
    return ret;
};

export function __wbg_pressure_adda5a83a9cec94d(arg0) {
    const ret = arg0.pressure;
    return ret;
};

export function __wbg_preventDefault_c2314fd813c02b3c(arg0) {
    arg0.preventDefault();
};

export function __wbg_prototype_e5ca21a1dfc16f8d() {
    const ret = ResizeObserverEntry.prototype;
    return ret;
};

export function __wbg_push_737cfc8c1432c2c6(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};

export function __wbg_queryCounterEXT_7aed85645b7ec1da(arg0, arg1, arg2) {
    arg0.queryCounterEXT(arg1, arg2 >>> 0);
};

export function __wbg_querySelectorAll_40998fd748f057ef() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments) };

export function __wbg_querySelector_c69f8b573958906b() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_queueMicrotask_65a6c48ee9790d40(arg0, arg1) {
    arg0.queueMicrotask(arg1);
};

export function __wbg_queueMicrotask_97d92b4fcc8a61c5(arg0) {
    queueMicrotask(arg0);
};

export function __wbg_queueMicrotask_d3219def82552485(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
};

export function __wbg_queue_0ffbb97537a0c4ed(arg0) {
    const ret = arg0.queue;
    return ret;
};

export function __wbg_readBuffer_1c35b1e4939f881d(arg0, arg1) {
    arg0.readBuffer(arg1 >>> 0);
};

export function __wbg_readPixels_51a0c02cdee207a5() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_readPixels_a6cbb21794452142() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_readPixels_cd64c5a7b0343355() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
}, arguments) };

export function __wbg_removeEventListener_056dfe8c3d6c58f9() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_removeListener_e55db581b73ccf65() { return handleError(function (arg0, arg1) {
    arg0.removeListener(arg1);
}, arguments) };

export function __wbg_removeProperty_0e85471f4dfc00ae() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_renderbufferStorageMultisample_13fbd5e58900c6fe(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_renderbufferStorage_73e01ea83b8afab4(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_renderbufferStorage_f010012bd3566942(arg0, arg1, arg2, arg3, arg4) {
    arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
};

export function __wbg_repeat_1882aa0d0072c705(arg0) {
    const ret = arg0.repeat;
    return ret;
};

export function __wbg_requestAdapter_85a0526011ba069a(arg0) {
    const ret = arg0.requestAdapter();
    return ret;
};

export function __wbg_requestAdapter_f09d28b3f37de26c(arg0, arg1) {
    const ret = arg0.requestAdapter(arg1);
    return ret;
};

export function __wbg_requestAnimationFrame_d7fd890aaefc3246() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestAnimationFrame(arg1);
    return ret;
}, arguments) };

export function __wbg_requestDevice_51509dadc50b2e9d(arg0, arg1) {
    const ret = arg0.requestDevice(arg1);
    return ret;
};

export function __wbg_requestFullscreen_5baa37ee77f5e149(arg0) {
    const ret = arg0.requestFullscreen;
    return ret;
};

export function __wbg_requestFullscreen_6a55f0ffc2773be2(arg0) {
    const ret = arg0.requestFullscreen();
    return ret;
};

export function __wbg_requestIdleCallback_a56d4deec1b072f1(arg0) {
    const ret = arg0.requestIdleCallback;
    return ret;
};

export function __wbg_requestIdleCallback_e3eefd34962470e1() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestIdleCallback(arg1);
    return ret;
}, arguments) };

export function __wbg_resolve_4851785c9c5f573d(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
};

export function __wbg_revokeObjectURL_27267efebeb457c7() { return handleError(function (arg0, arg1) {
    URL.revokeObjectURL(getStringFromWasm0(arg0, arg1));
}, arguments) };

export function __wbg_samplerParameterf_909baf50360c94d4(arg0, arg1, arg2, arg3) {
    arg0.samplerParameterf(arg1, arg2 >>> 0, arg3);
};

export function __wbg_samplerParameteri_d5c292172718da63(arg0, arg1, arg2, arg3) {
    arg0.samplerParameteri(arg1, arg2 >>> 0, arg3);
};

export function __wbg_scheduler_5d1a241fa963f672(arg0) {
    const ret = arg0.scheduler;
    return ret;
};

export function __wbg_scheduler_b7dd1b4a0e2e7347(arg0) {
    const ret = arg0.scheduler;
    return ret;
};

export function __wbg_scissor_e917a332f67a5d30(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_scissor_eb177ca33bf24a44(arg0, arg1, arg2, arg3, arg4) {
    arg0.scissor(arg1, arg2, arg3, arg4);
};

export function __wbg_setAttribute_2704501201f15687() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setBindGroup_a81ce7b3934585bf(arg0, arg1, arg2) {
    arg0.setBindGroup(arg1 >>> 0, arg2);
};

export function __wbg_setBindGroup_bb0c2c05b7c49401() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
}, arguments) };

export function __wbg_setIndexBuffer_0487a271efcfe0ac(arg0, arg1, arg2, arg3) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
};

export function __wbg_setIndexBuffer_97fb24e7cc5b24c0(arg0, arg1, arg2, arg3, arg4) {
    arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
};

export function __wbg_setPipeline_78f8f6d440dddd25(arg0, arg1) {
    arg0.setPipeline(arg1);
};

export function __wbg_setPointerCapture_c04dafaf4d00ffad() { return handleError(function (arg0, arg1) {
    arg0.setPointerCapture(arg1);
}, arguments) };

export function __wbg_setProperty_f2cf326652b9a713() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setTimeout_461fec76662b35ea() { return handleError(function (arg0, arg1) {
    const ret = arg0.setTimeout(arg1);
    return ret;
}, arguments) };

export function __wbg_setTimeout_f2fe5af8e3debeb3() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.setTimeout(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_setVertexBuffer_b0d3128a04bfd766(arg0, arg1, arg2, arg3, arg4) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
};

export function __wbg_setVertexBuffer_edbff6ddb5055174(arg0, arg1, arg2, arg3) {
    arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
};

export function __wbg_set_65595bdd868b3009(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

export function __wbg_set_bb8cecf6a62b9f46() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_seta_721deab95e136b71(arg0, arg1) {
    arg0.a = arg1;
};

export function __wbg_setaccess_b20bfa3ec6b65d05(arg0, arg1) {
    arg0.access = __wbindgen_enum_GpuStorageTextureAccess[arg1];
};

export function __wbg_setalpha_2c7bdc9da833b6c2(arg0, arg1) {
    arg0.alpha = arg1;
};

export function __wbg_setalphamode_fc3528d234b1fefa(arg0, arg1) {
    arg0.alphaMode = __wbindgen_enum_GpuCanvasAlphaMode[arg1];
};

export function __wbg_setalphatocoverageenabled_314ce1ca1759b395(arg0, arg1) {
    arg0.alphaToCoverageEnabled = arg1 !== 0;
};

export function __wbg_setarraylayercount_3c7942d623042874(arg0, arg1) {
    arg0.arrayLayerCount = arg1 >>> 0;
};

export function __wbg_setarraystride_4b36d0822dea74a8(arg0, arg1) {
    arg0.arrayStride = arg1;
};

export function __wbg_setaspect_f06e234d0aacd1a6(arg0, arg1) {
    arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
};

export function __wbg_setattributes_382cc084e6792c33(arg0, arg1) {
    arg0.attributes = arg1;
};

export function __wbg_setb_f53c2f10173c804f(arg0, arg1) {
    arg0.b = arg1;
};

export function __wbg_setbasearraylayer_a5b968338c5c56b6(arg0, arg1) {
    arg0.baseArrayLayer = arg1 >>> 0;
};

export function __wbg_setbasemiplevel_e3288c2d851da708(arg0, arg1) {
    arg0.baseMipLevel = arg1 >>> 0;
};

export function __wbg_setbeginningofpasswriteindex_35dcbf135e4f9d61(arg0, arg1) {
    arg0.beginningOfPassWriteIndex = arg1 >>> 0;
};

export function __wbg_setbindgrouplayouts_8de6e109dd34a448(arg0, arg1) {
    arg0.bindGroupLayouts = arg1;
};

export function __wbg_setbinding_5276d6202fceba46(arg0, arg1) {
    arg0.binding = arg1 >>> 0;
};

export function __wbg_setbinding_9e9ed8b6e1418176(arg0, arg1) {
    arg0.binding = arg1 >>> 0;
};

export function __wbg_setblend_6828ff186670f414(arg0, arg1) {
    arg0.blend = arg1;
};

export function __wbg_setbox_2786f3ccea97cac4(arg0, arg1) {
    arg0.box = __wbindgen_enum_ResizeObserverBoxOptions[arg1];
};

export function __wbg_setbuffer_1acdac44d9638973(arg0, arg1) {
    arg0.buffer = arg1;
};

export function __wbg_setbuffer_74b7b0adf855cf1a(arg0, arg1) {
    arg0.buffer = arg1;
};

export function __wbg_setbuffers_53e83b7c7a5c95aa(arg0, arg1) {
    arg0.buffers = arg1;
};

export function __wbg_setclearvalue_f82fff01ed0b5c35(arg0, arg1) {
    arg0.clearValue = arg1;
};

export function __wbg_setcode_6b6ad02fc1705aa2(arg0, arg1, arg2) {
    arg0.code = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setcolor_0df2c5f47a951ac1(arg0, arg1) {
    arg0.color = arg1;
};

export function __wbg_setcolorattachments_de625dd9a4850a13(arg0, arg1) {
    arg0.colorAttachments = arg1;
};

export function __wbg_setcompare_8fbddcdd4781f49a(arg0, arg1) {
    arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
};

export function __wbg_setcount_e8b681b1185cf5da(arg0, arg1) {
    arg0.count = arg1 >>> 0;
};

export function __wbg_setcullmode_74bc6eaab528c94b(arg0, arg1) {
    arg0.cullMode = __wbindgen_enum_GpuCullMode[arg1];
};

export function __wbg_setdepthbias_cdcc35c6971d19cd(arg0, arg1) {
    arg0.depthBias = arg1;
};

export function __wbg_setdepthbiasclamp_57801e26f66496d9(arg0, arg1) {
    arg0.depthBiasClamp = arg1;
};

export function __wbg_setdepthbiasslopescale_81699f807bd5a647(arg0, arg1) {
    arg0.depthBiasSlopeScale = arg1;
};

export function __wbg_setdepthclearvalue_9801aa9eff7645df(arg0, arg1) {
    arg0.depthClearValue = arg1;
};

export function __wbg_setdepthcompare_53d249a136855bd8(arg0, arg1) {
    arg0.depthCompare = __wbindgen_enum_GpuCompareFunction[arg1];
};

export function __wbg_setdepthfailop_2e4767995acd4c0a(arg0, arg1) {
    arg0.depthFailOp = __wbindgen_enum_GpuStencilOperation[arg1];
};

export function __wbg_setdepthloadop_af0b0f05e83f6571(arg0, arg1) {
    arg0.depthLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
};

export function __wbg_setdepthorarraylayers_5d480fc05509ea0c(arg0, arg1) {
    arg0.depthOrArrayLayers = arg1 >>> 0;
};

export function __wbg_setdepthreadonly_a7b7224074e024d3(arg0, arg1) {
    arg0.depthReadOnly = arg1 !== 0;
};

export function __wbg_setdepthstencil_2bb2fcea55783858(arg0, arg1) {
    arg0.depthStencil = arg1;
};

export function __wbg_setdepthstencilattachment_dcbd5b74e4350e16(arg0, arg1) {
    arg0.depthStencilAttachment = arg1;
};

export function __wbg_setdepthstoreop_40dfd99c7e42f894(arg0, arg1) {
    arg0.depthStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
};

export function __wbg_setdepthwriteenabled_4368a2fe5d258cb0(arg0, arg1) {
    arg0.depthWriteEnabled = arg1 !== 0;
};

export function __wbg_setdevice_d372d6aa06f20cae(arg0, arg1) {
    arg0.device = arg1;
};

export function __wbg_setdimension_268b2b7bfc3e2bb8(arg0, arg1) {
    arg0.dimension = __wbindgen_enum_GpuTextureDimension[arg1];
};

export function __wbg_setdimension_359b229ea1b67a77(arg0, arg1) {
    arg0.dimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
};

export function __wbg_setdstfactor_96e73b9eaedeb23e(arg0, arg1) {
    arg0.dstFactor = __wbindgen_enum_GpuBlendFactor[arg1];
};

export function __wbg_setendofpasswriteindex_71e7659a9d2a9d60(arg0, arg1) {
    arg0.endOfPassWriteIndex = arg1 >>> 0;
};

export function __wbg_setentries_5941f16619f54d42(arg0, arg1) {
    arg0.entries = arg1;
};

export function __wbg_setentries_97a6ad10aa7fa4d1(arg0, arg1) {
    arg0.entries = arg1;
};

export function __wbg_setentrypoint_a858879f63ec2236(arg0, arg1, arg2) {
    arg0.entryPoint = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setentrypoint_a8ce0b22c20548b0(arg0, arg1, arg2) {
    arg0.entryPoint = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setfailop_d55bda42958efa98(arg0, arg1) {
    arg0.failOp = __wbindgen_enum_GpuStencilOperation[arg1];
};

export function __wbg_setformat_69ba449c0e080708(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
};

export function __wbg_setformat_713b9e90b13df6aa(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuVertexFormat[arg1];
};

export function __wbg_setformat_76bcf93126fcdc9d(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
};

export function __wbg_setformat_970299d3f84a8f20(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
};

export function __wbg_setformat_a8a60feb127f0971(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
};

export function __wbg_setformat_beb33029aea4cf8e(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
};

export function __wbg_setformat_f6ec428901712514(arg0, arg1) {
    arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
};

export function __wbg_setfragment_0f23dfb67b3e84ab(arg0, arg1) {
    arg0.fragment = arg1;
};

export function __wbg_setfrontface_c80337acd997f8c6(arg0, arg1) {
    arg0.frontFace = __wbindgen_enum_GpuFrontFace[arg1];
};

export function __wbg_setg_7eb6b5e67456a09e(arg0, arg1) {
    arg0.g = arg1;
};

export function __wbg_sethasdynamicoffset_b34dfdba692a7959(arg0, arg1) {
    arg0.hasDynamicOffset = arg1 !== 0;
};

export function __wbg_setheight_433680330c9420c3(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_setheight_a7439239ff109215(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_setheight_da683a33fa99843c(arg0, arg1) {
    arg0.height = arg1 >>> 0;
};

export function __wbg_setlabel_1df8805b2aad72d7(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_460a52030d604dd7(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_57008c2e11276b5e(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_68cd87490e02e1de(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_76b058f0224eb49e(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_89c327fa94d8076b(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_969d6f8279c74456(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_a0c41069e355431e(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_c14214ffbf6e5c4a(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_ca2c132e2b646244(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_e6fab993e10f1dd3(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlabel_f9a45e9ef445b781(arg0, arg1, arg2) {
    arg0.label = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setlayout_67a29edc6247c437(arg0, arg1) {
    arg0.layout = arg1;
};

export function __wbg_setlayout_758d30edbd6ea91c(arg0, arg1) {
    arg0.layout = arg1;
};

export function __wbg_setloadop_5644a3bf70f4f76c(arg0, arg1) {
    arg0.loadOp = __wbindgen_enum_GpuLoadOp[arg1];
};

export function __wbg_setmappedatcreation_0dc5796d4e90ab4b(arg0, arg1) {
    arg0.mappedAtCreation = arg1 !== 0;
};

export function __wbg_setmask_800b15ad78613be8(arg0, arg1) {
    arg0.mask = arg1 >>> 0;
};

export function __wbg_setminbindingsize_20ca594cd6d93818(arg0, arg1) {
    arg0.minBindingSize = arg1;
};

export function __wbg_setmiplevelcount_5e59806cbcf116e9(arg0, arg1) {
    arg0.mipLevelCount = arg1 >>> 0;
};

export function __wbg_setmiplevelcount_f896fe8cbb669df2(arg0, arg1) {
    arg0.mipLevelCount = arg1 >>> 0;
};

export function __wbg_setmodule_4c73bb35cb0beb0b(arg0, arg1) {
    arg0.module = arg1;
};

export function __wbg_setmodule_ca21130b3f66ea5d(arg0, arg1) {
    arg0.module = arg1;
};

export function __wbg_setmultisample_4f57dcaa4144a62f(arg0, arg1) {
    arg0.multisample = arg1;
};

export function __wbg_setmultisampled_0bb9fc1b577bf11a(arg0, arg1) {
    arg0.multisampled = arg1 !== 0;
};

export function __wbg_setoffset_a8194a4fcfff8910(arg0, arg1) {
    arg0.offset = arg1;
};

export function __wbg_setoffset_d37e5fa34e9ded2e(arg0, arg1) {
    arg0.offset = arg1;
};

export function __wbg_setonmessage_23d122da701b8ddb(arg0, arg1) {
    arg0.onmessage = arg1;
};

export function __wbg_setoperation_173958551af7f4f2(arg0, arg1) {
    arg0.operation = __wbindgen_enum_GpuBlendOperation[arg1];
};

export function __wbg_setpassop_070547fd6160a00d(arg0, arg1) {
    arg0.passOp = __wbindgen_enum_GpuStencilOperation[arg1];
};

export function __wbg_setpowerpreference_1f3351e5d2acf765(arg0, arg1) {
    arg0.powerPreference = __wbindgen_enum_GpuPowerPreference[arg1];
};

export function __wbg_setprimitive_ee18492ab93953bc(arg0, arg1) {
    arg0.primitive = arg1;
};

export function __wbg_setqueryset_3b14f95f9bd114db(arg0, arg1) {
    arg0.querySet = arg1;
};

export function __wbg_setr_a4e2f60e3466da86(arg0, arg1) {
    arg0.r = arg1;
};

export function __wbg_setrequiredfeatures_fc44bc3433300ee3(arg0, arg1) {
    arg0.requiredFeatures = arg1;
};

export function __wbg_setresolvetarget_c4b519cab7eb42b7(arg0, arg1) {
    arg0.resolveTarget = arg1;
};

export function __wbg_setresource_1659f5a29a2e0541(arg0, arg1) {
    arg0.resource = arg1;
};

export function __wbg_setsamplecount_e88d044f067a2241(arg0, arg1) {
    arg0.sampleCount = arg1 >>> 0;
};

export function __wbg_setsampler_a778272f31d31ce5(arg0, arg1) {
    arg0.sampler = arg1;
};

export function __wbg_setsampletype_c0e25b966db74174(arg0, arg1) {
    arg0.sampleType = __wbindgen_enum_GpuTextureSampleType[arg1];
};

export function __wbg_setshaderlocation_985046f48e76573f(arg0, arg1) {
    arg0.shaderLocation = arg1 >>> 0;
};

export function __wbg_setsize_23676383c9c0732f(arg0, arg1) {
    arg0.size = arg1;
};

export function __wbg_setsize_51616eaf8209c58b(arg0, arg1) {
    arg0.size = arg1;
};

export function __wbg_setsize_5878aadcd23673cf(arg0, arg1) {
    arg0.size = arg1;
};

export function __wbg_setsrcfactor_04ce8874f1bff5a8(arg0, arg1) {
    arg0.srcFactor = __wbindgen_enum_GpuBlendFactor[arg1];
};

export function __wbg_setstencilback_4b20ecfcd4c4816a(arg0, arg1) {
    arg0.stencilBack = arg1;
};

export function __wbg_setstencilclearvalue_7ba82e1993788f37(arg0, arg1) {
    arg0.stencilClearValue = arg1 >>> 0;
};

export function __wbg_setstencilfront_1ca3b695f7c42f6a(arg0, arg1) {
    arg0.stencilFront = arg1;
};

export function __wbg_setstencilloadop_b65c60a0077315cd(arg0, arg1) {
    arg0.stencilLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
};

export function __wbg_setstencilreadmask_4f5b98747141e796(arg0, arg1) {
    arg0.stencilReadMask = arg1 >>> 0;
};

export function __wbg_setstencilreadonly_9006a99a91d198e9(arg0, arg1) {
    arg0.stencilReadOnly = arg1 !== 0;
};

export function __wbg_setstencilstoreop_4f00c5eca345c145(arg0, arg1) {
    arg0.stencilStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
};

export function __wbg_setstencilwritemask_e37a7214d84ace99(arg0, arg1) {
    arg0.stencilWriteMask = arg1 >>> 0;
};

export function __wbg_setstepmode_7d58d75e6547a7a6(arg0, arg1) {
    arg0.stepMode = __wbindgen_enum_GpuVertexStepMode[arg1];
};

export function __wbg_setstoragetexture_2987339fec972d54(arg0, arg1) {
    arg0.storageTexture = arg1;
};

export function __wbg_setstoreop_c62dd050b5806095(arg0, arg1) {
    arg0.storeOp = __wbindgen_enum_GpuStoreOp[arg1];
};

export function __wbg_setstripindexformat_3e4893749b3f00b0(arg0, arg1) {
    arg0.stripIndexFormat = __wbindgen_enum_GpuIndexFormat[arg1];
};

export function __wbg_settargets_0ef1de33af7253a6(arg0, arg1) {
    arg0.targets = arg1;
};

export function __wbg_settexture_f62859f817324dd1(arg0, arg1) {
    arg0.texture = arg1;
};

export function __wbg_settimestampwrites_1995524c3a31cb8f(arg0, arg1) {
    arg0.timestampWrites = arg1;
};

export function __wbg_settopology_3d9b2f0ffe2e350c(arg0, arg1) {
    arg0.topology = __wbindgen_enum_GpuPrimitiveTopology[arg1];
};

export function __wbg_settype_0b59dd5f4721c490(arg0, arg1) {
    arg0.type = __wbindgen_enum_GpuSamplerBindingType[arg1];
};

export function __wbg_settype_39ed370d3edd403c(arg0, arg1, arg2) {
    arg0.type = getStringFromWasm0(arg1, arg2);
};

export function __wbg_settype_8c8bbfab4cf7e32e(arg0, arg1) {
    arg0.type = __wbindgen_enum_GpuBufferBindingType[arg1];
};

export function __wbg_setusage_44ebc3b496e60ff4(arg0, arg1) {
    arg0.usage = arg1 >>> 0;
};

export function __wbg_setusage_4cf7b16df5617a46(arg0, arg1) {
    arg0.usage = arg1 >>> 0;
};

export function __wbg_setusage_c45cca4a5b9f8376(arg0, arg1) {
    arg0.usage = arg1 >>> 0;
};

export function __wbg_setusage_e58b3c3ce83fbbda(arg0, arg1) {
    arg0.usage = arg1 >>> 0;
};

export function __wbg_setvertex_6144c56d98e2314a(arg0, arg1) {
    arg0.vertex = arg1;
};

export function __wbg_setview_4bc3dfcbfc8a58ba(arg0, arg1) {
    arg0.view = arg1;
};

export function __wbg_setview_8d0b0055b6ef07e3(arg0, arg1) {
    arg0.view = arg1;
};

export function __wbg_setviewdimension_afac48443b8fb565(arg0, arg1) {
    arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
};

export function __wbg_setviewdimension_f5d4b5336a27d302(arg0, arg1) {
    arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
};

export function __wbg_setviewformats_0cfe174ac882efaf(arg0, arg1) {
    arg0.viewFormats = arg1;
};

export function __wbg_setviewformats_c566feb1da7b1925(arg0, arg1) {
    arg0.viewFormats = arg1;
};

export function __wbg_setvisibility_7245f1acbedb4ff4(arg0, arg1) {
    arg0.visibility = arg1 >>> 0;
};

export function __wbg_setwidth_056381a7176ba440(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_setwidth_660ca581e3fbe279(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_setwidth_c5fed9f5e7f0b406(arg0, arg1) {
    arg0.width = arg1 >>> 0;
};

export function __wbg_setwritemask_c381ff702509999c(arg0, arg1) {
    arg0.writeMask = arg1 >>> 0;
};

export function __wbg_shaderSource_72d3e8597ef85b67(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
};

export function __wbg_shaderSource_ad0087e637a35191(arg0, arg1, arg2, arg3) {
    arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
};

export function __wbg_shiftKey_2bebb3b703254f47(arg0) {
    const ret = arg0.shiftKey;
    return ret;
};

export function __wbg_shiftKey_86e737105bab1a54(arg0) {
    const ret = arg0.shiftKey;
    return ret;
};

export function __wbg_signal_aaf9ad74119f20a4(arg0) {
    const ret = arg0.signal;
    return ret;
};

export function __wbg_stack_0ed75d68575b0f3c(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_start_2c099369ce831bf1(arg0) {
    arg0.start();
};

export function __wbg_static_accessor_GLOBAL_88a902d13a557d07() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_SELF_37c5d418e4bf5819() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_WINDOW_5de37043a91a9c40() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_stencilFuncSeparate_91700dcf367ae07e(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilFuncSeparate_c1a6fa2005ca0aaf(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
};

export function __wbg_stencilMaskSeparate_4f1a2defc8c10956(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilMaskSeparate_f8a0cfb5c2994d4a(arg0, arg1, arg2) {
    arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_stencilMask_1e602ef63f5b4144(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
};

export function __wbg_stencilMask_cd8ca0a55817e599(arg0, arg1) {
    arg0.stencilMask(arg1 >>> 0);
};

export function __wbg_stencilOpSeparate_1fa08985e79e1627(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_stencilOpSeparate_ff6683bbe3838ae6(arg0, arg1, arg2, arg3, arg4) {
    arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
};

export function __wbg_style_fb30c14e5815805c(arg0) {
    const ret = arg0.style;
    return ret;
};

export function __wbg_submit_252766c4e0945cee(arg0, arg1) {
    arg0.submit(arg1);
};

export function __wbg_texImage2D_57483314967bdd11() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texImage2D_5f2835f02b1d1077() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texImage2D_b8edcb5692f65f88() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texImage3D_921b54d09bf45af0() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
}, arguments) };

export function __wbg_texImage3D_a00b7a4df48cf757() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
}, arguments) };

export function __wbg_texParameteri_8112b26b3c360b7e(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_texParameteri_ef50743cb94d507e(arg0, arg1, arg2, arg3) {
    arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
};

export function __wbg_texStorage2D_fbda848497f3674e(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_texStorage3D_fd7a7ca30e7981d1(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
};

export function __wbg_texSubImage2D_061605071aad9d2c() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_aa9a084093764796() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_c7951ed97252bdff() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_d52d1a0d3654c60b() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_dd9cac68ad5fe0b6() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_e6d34f5bb062e404() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_f39ea52a2d4bd2f7() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage2D_fbdf91268228c757() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
}, arguments) };

export function __wbg_texSubImage3D_04731251d7cecc83() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_37f0045d16871670() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_3a871f6405d2f183() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_66acd67f56e3b214() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_a051de089266fa1b() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_b28c55f839bbec41() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_texSubImage3D_f18bf091cd48774c() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
}, arguments) };

export function __wbg_then_44b73946d2fb3e7d(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
};

export function __wbg_then_48b406749878a531(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
};

export function __wbg_uniform1f_21390b04609a9fa5(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
};

export function __wbg_uniform1f_dc009a0e7f7e5977(arg0, arg1, arg2) {
    arg0.uniform1f(arg1, arg2);
};

export function __wbg_uniform1i_5ddd9d8ccbd390bb(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
};

export function __wbg_uniform1i_ed95b6129dce4d84(arg0, arg1, arg2) {
    arg0.uniform1i(arg1, arg2);
};

export function __wbg_uniform1ui_66e092b67a21c84d(arg0, arg1, arg2) {
    arg0.uniform1ui(arg1, arg2 >>> 0);
};

export function __wbg_uniform2fv_656fce9525420996(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2fv_d8bd2a36da7ce440(arg0, arg1, arg2, arg3) {
    arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_4d39fc5a26f03f55(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2iv_e967139a28017a99(arg0, arg1, arg2, arg3) {
    arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform2uiv_4c340c9e8477bb07(arg0, arg1, arg2, arg3) {
    arg0.uniform2uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_7d828b7c4c91138e(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3fv_8153c834ce667125(arg0, arg1, arg2, arg3) {
    arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_58662d914661aa10(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3iv_f30d27ec224b4b24(arg0, arg1, arg2, arg3) {
    arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform3uiv_38673b825dc755f6(arg0, arg1, arg2, arg3) {
    arg0.uniform3uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4f_36b8f9be15064aa7(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_uniform4f_f7ea07febf8b5108(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
};

export function __wbg_uniform4fv_8827081a7585145b(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4fv_c01fbc6c022abac3(arg0, arg1, arg2, arg3) {
    arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_7fe05be291899f06(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4iv_84fdf80745e7ff26(arg0, arg1, arg2, arg3) {
    arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
};

export function __wbg_uniform4uiv_9de55998fbfef236(arg0, arg1, arg2, arg3) {
    arg0.uniform4uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
};

export function __wbg_uniformBlockBinding_18117f4bda07115b(arg0, arg1, arg2, arg3) {
    arg0.uniformBlockBinding(arg1, arg2 >>> 0, arg3 >>> 0);
};

export function __wbg_uniformMatrix2fv_98681e400347369c(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2fv_bc019eb4784a3b8c(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2x3fv_6421f8d6f7f4d144(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix2x4fv_27d807767d7aadc6(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix2x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_3d6ad3a1e0b0b5b6(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3fv_3df529aab93cf902(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3x2fv_79357317e9637d05(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix3x4fv_9d1a88b5abfbd64b(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix3x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_da94083874f202ad(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4fv_e87383507ae75670(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4x2fv_aa507d918a0b5a62(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_uniformMatrix4x3fv_6712c7a3b4276fb4(arg0, arg1, arg2, arg3, arg4) {
    arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
};

export function __wbg_unmap_7b299155f31a9d79(arg0) {
    arg0.unmap();
};

export function __wbg_unobserve_02f53d1ca2d1d801(arg0, arg1) {
    arg0.unobserve(arg1);
};

export function __wbg_useProgram_473bf913989b6089(arg0, arg1) {
    arg0.useProgram(arg1);
};

export function __wbg_useProgram_9b2660f7bb210471(arg0, arg1) {
    arg0.useProgram(arg1);
};

export function __wbg_userAgentData_dbca1fdd89f06698(arg0) {
    const ret = arg0.userAgentData;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_userAgent_12e9d8e62297563f() { return handleError(function (arg0, arg1) {
    const ret = arg1.userAgent;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_vertexAttribDivisorANGLE_11e909d332960413(arg0, arg1, arg2) {
    arg0.vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_vertexAttribDivisor_4d361d77ffb6d3ff(arg0, arg1, arg2) {
    arg0.vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
};

export function __wbg_vertexAttribIPointer_d0c67543348c90ce(arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
};

export function __wbg_vertexAttribPointer_550dc34903e3d1ea(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_vertexAttribPointer_7a2a506cdbe3aebc(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
};

export function __wbg_viewport_a1b4d71297ba89af(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_viewport_e615e98f676f2d39(arg0, arg1, arg2, arg3, arg4) {
    arg0.viewport(arg1, arg2, arg3, arg4);
};

export function __wbg_visibilityState_f3cc18a6f3831137(arg0) {
    const ret = arg0.visibilityState;
    return (__wbindgen_enum_VisibilityState.indexOf(ret) + 1 || 3) - 1;
};

export function __wbg_warn_4ca3906c248c47c4(arg0) {
    console.warn(arg0);
};

export function __wbg_webkitFullscreenElement_d2d0834cc237348d(arg0) {
    const ret = arg0.webkitFullscreenElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_webkitRequestFullscreen_fe6181fae8e7477c(arg0) {
    arg0.webkitRequestFullscreen();
};

export function __wbg_width_cdaf02311c1621d1(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_writeBuffer_3193eaacefdcf39a() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    arg0.writeBuffer(arg1, arg2, arg3, arg4, arg5);
}, arguments) };

export function __wbindgen_boolean_get(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbindgen_cb_drop(arg0) {
    const obj = arg0.original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_closure_wrapper6204(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_32);
    return ret;
};

export function __wbindgen_closure_wrapper6205(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_35);
    return ret;
};

export function __wbindgen_closure_wrapper6206(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_32);
    return ret;
};

export function __wbindgen_closure_wrapper6207(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_32);
    return ret;
};

export function __wbindgen_closure_wrapper6208(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_32);
    return ret;
};

export function __wbindgen_closure_wrapper6209(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_32);
    return ret;
};

export function __wbindgen_closure_wrapper6210(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_32);
    return ret;
};

export function __wbindgen_closure_wrapper6211(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_32);
    return ret;
};

export function __wbindgen_closure_wrapper6212(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2390, __wbg_adapter_50);
    return ret;
};

export function __wbindgen_closure_wrapper8123(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 2560, __wbg_adapter_53);
    return ret;
};

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_1;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

export function __wbindgen_is_null(arg0) {
    const ret = arg0 === null;
    return ret;
};

export function __wbindgen_is_undefined(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return ret;
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return ret;
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

