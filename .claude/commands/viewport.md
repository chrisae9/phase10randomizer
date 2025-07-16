Of course. That's a classic and frustrating problem in mobile web development. The discrepancy you're seeing is because mobile browsers like Chrome on iOS have a dynamic UI (the address bar and toolbar) that appears and disappears, changing the actual visible screen area. Your desktop DevTools often simulate a fixed viewport height, which doesn't account for this.

The key is to stop using the standard viewport height unit (`vh`) for full-screen elements and instead use newer, more precise units or a JavaScript approach.

-----

### Understanding Mobile Viewport Units

The traditional `100vh` (100% of the viewport height) is often calculated based on the browser's largest possible size—when the UI is hidden. When the UI is visible, your `100vh` element is taller than the screen, causing that annoying scroll. To fix this, CSS introduced new units.

  * `svh` (**Small Viewport Height**): Represents the height when the browser UI is **fully visible**. `100svh` will always fit on the screen without being hidden by the UI.
  * `lvh` (**Large Viewport Height**): Represents the height when the browser UI is **hidden** (e.g., after the user scrolls down). This is often what `vh` behaves like.
  * `dvh` (**Dynamic Viewport Height**): This is the magic one ✨. It **automatically adjusts** its value as the browser's UI expands or retracts. It always matches the visible portion of the screen.

| Unit | Description | Use Case |
| :--- | :--- | :--- |
| **`svh`** | Smallest possible viewport. | When you need to guarantee an element is fully visible on load, without any scrolling. |
| **`dvh`** | Dynamically changes with the UI. | For elements that should always fill the *visible* screen space perfectly. **This is often the best choice.** |
| **`vh`** | Usually the largest viewport. | Legacy use; avoid for full-height mobile layouts. |

-----

### Modern CSS Solutions

For modern browsers (including recent versions of Chrome, Safari, and Firefox), you can solve this with a single line of CSS.

#### 1\. Use Dynamic Viewport Height (`dvh`)

This is the most direct solution. Instead of setting the height of your full-screen container to `100vh`, use `100dvh`. This ensures the container resizes perfectly as the Chrome UI appears and disappears.

```css
.full-screen-container {
  /* Before */
  height: 100vh; 

  /* After - The Fix */
  height: 100dvh;
}
```

#### 2\. Handle iPhone Notches and Home Bars

iPhones with a notch or Dynamic Island introduce another challenge: the "safe area." You need to ensure your content isn't hidden behind the notch or the home indicator at the bottom.

First, update your `viewport` meta tag in your HTML `<head>` to include `viewport-fit=cover`. This allows your page to draw into the unsafe areas.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Next, use CSS environment variables to add padding only where needed, pushing your content into the safe zone.

```css
body {
  /* Adds padding to the top/bottom/sides to avoid the notch and home bar */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

You can apply this padding to a specific container instead of the `body` if you only want certain elements to respect the safe area.

-----

### A JavaScript Fallback Method

If you need to support older browsers that don't understand `dvh`, you can use a small amount of JavaScript to calculate the visible height (`window.innerHeight`) and set it as a CSS custom property.

1.  **Add this script to your page.** It calculates the true visible height and makes it available to your CSS as a variable named `--vh`.

    ```javascript
    function setViewportHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Set it initially
    setViewportHeight();

    // Rerun it on resize
    window.addEventListener('resize', setViewportHeight);
    ```

2.  **Use the custom property in your CSS.**

    ```css
    .full-screen-container {
      /* Uses the JS variable, with a fallback to the old vh unit */
      height: calc(var(--vh, 1vh) * 100);
    }
    ```

This method gives you precise control and is the most compatible solution across all devices.