"use strict";
exports.id = 770;
exports.ids = [770];
exports.modules = {

/***/ 860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ContentSection)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function ContentSection({ width ="100%" , children , style  }) {
    let inlineStyle = style ? style : {};
    inlineStyle.width = width;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "ContentSection",
        style: inlineStyle,
        children: children
    }));
};


/***/ }),

/***/ 266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Footer)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./src/components/common/BrandFace/BrandFace.js
var BrandFace = __webpack_require__(489);
;// CONCATENATED MODULE: ./src/components/common/JoinDiscordButton/JoinDiscordButton.js


function JoinDiscordButton(props) {
    return(/*#__PURE__*/ _jsx("a", {
        href: "https://discord.gg/ANT6XsSUyZ",
        target: "_blank",
        children: /*#__PURE__*/ _jsx("button", {
            style: props.style,
            className: "ButtonWhite",
            children: "JOIN DISCORD"
        })
    }));
};

// EXTERNAL MODULE: external "@fortawesome/free-brands-svg-icons"
var free_brands_svg_icons_ = __webpack_require__(368);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(197);
;// CONCATENATED MODULE: ./src/components/common/Logo/Logo.js


function Logo(props) {
    return(/*#__PURE__*/ jsx_runtime_.jsx("a", {
        href: "https://blankhumanity.com",
        style: {
            color: "white",
            textDecoration: "none"
        },
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
            className: "Logo",
            style: {
                fontFamily: "Bungee"
            },
            children: [
                "BLANK_",
                "  ",
                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    style: {
                        fontSize: ".6em"
                    },
                    children: "humanity"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    style: {
                        width: "100%",
                        fontSize: "1.25rem",
                        fontFamily: "Fira Code"
                    },
                    children: props.tagline
                })
            ]
        })
    }));
};

;// CONCATENATED MODULE: ./src/components/common/Footer/Footer.js







function Footer(props) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "Footer",
        style: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "end"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(BrandFace/* default */.Z, {
                        faceColor: "white",
                        style: {
                            width: "3.5rem",
                            height: "2.25rem",
                            margin: "none",
                            padding: "1.5rem"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Logo, {
                        tagline: "Episode 0: Greetings"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                style: {
                    width: "10%",
                    display: "flex",
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://discord.gg/ANT6XsSUyZ",
                        target: "_blank",
                        style: {
                            color: "white",
                            textDecoration: "none",
                            fontSize: "2rem"
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                            icon: free_brands_svg_icons_.faDiscord
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://twitter.com/blankhumanity",
                        target: "_blank",
                        style: {
                            color: "white",
                            textDecoration: "none",
                            fontSize: "2rem"
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                            icon: free_brands_svg_icons_.faTwitter
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://opensea.io/collection/blank-humanity-initializers",
                        target: "_blank",
                        style: {
                            color: "white",
                            textDecoration: "none"
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: "/OpenSeaLogo.png",
                            style: {
                                width: "2rem"
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                style: {
                    width: "100%",
                    textAlign: "center",
                    position: "absolute",
                    bottom: "1rem",
                    fontSize: "1rem"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://blankhumanity.com/privacy-policy",
                        target: "_blank",
                        children: "Privacy Policy"
                    }),
                    " ",
                    "|",
                    " ",
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "https://blankhumanity.com/terms-and-conditions",
                        target: "_blank",
                        children: "Terms and Conditions"
                    })
                ]
            })
        ]
    }));
};


/***/ })

};
;