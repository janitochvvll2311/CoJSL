# Layout Module #

Replaces html elements with custom content.

## Functions ##

- [`getLayout(src)`](#getlayout)
- [`setLayout(element, src)`](#setlayout)
- [`useLayous(root, attr)`](#uselayouts)
- [`usetemplatelayouts(root, attr)`](#usetemplatelayouts)

### getLayout ###

```js
// Get an HTMLElement using fetch()
let layout = await getLayout("./content.html");
```

### setLayout ###

```js
let element = document.getElementById("myElement");
// Replaces the element with the html content
await setLayout(element, "./content.html");
```

### useLayouts ###

```js
// Same as: await useLayouts(document.body, "layout");
// Query for all layouted elements and replace them
await useLayouts();

let element = document.getElementById("myElement");
// Query for all layouted child elements and replace them
await useLayouts(element);
```

### useTemplateLayouts ###

```js
// Same as: await usetemplatelayouts(document.body, "layout");
await usetemplatelayouts();

let element = document.getElementById("myElement");
await usetemplatelayouts(element);
```
