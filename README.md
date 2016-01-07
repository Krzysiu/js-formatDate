# js-formatDate
JavaScript function that mimics date() from PHP

## Usage

**function formatDate(repStr, dateObj)**

* *(str)* **repStr** - format string, the same as in PHP function [date()](http://php.net/manual/en/function.date.php), with exceptions:
    + it doesn't allow escaping characters (you can use e.g. `var foo = 'Time: ' + formatDate('H:i')`)
    + `e` and `T` doesn't work (timezone identifier and abbreviation)
    + I'm not sure about `O` - ISO-8601 year number. It's very rarely used, tho.
    + only English locale
* *(obj)* **dateObj** - replacement for PHP `$timestamp` - object allowing you to set date:
    + *(int)* `th`, `tm`, `ts` - time values - hours, minutes, seconds
    + *(int)* `dy`, `dm`, `dd` - date values - year (4 digits), month (note that it takes month 1-12, not 0-11, like JavaScript `Date()` object), day
    + *(str)* `str` - string for [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse), which has lower priority than values above (i.e. first `str` is parsed, then integer values)

## Examples
Examples assume that current date is 07-01-2015, 04:20:15.

`var myDate = formatDate('H:i:s')` - **`04:20:15`**
`var myDate = formatDate('jS F Y, g A')` - **`7th January 2015, 4 AM`**
`var myDate = formatDate('H:i:s', {th: 0, ts: 7})` - **`00:20:07`** (note that minutes aren't changed)

`var year = 2012; var msg = year.toString() + 'was a'  + (formatDate('L', {dy: year}) == 1 ? 'leap year' : 'normal year') + '!'` - **`2012 was a leap year!`**

## Browser support
It was tested on Firefox 43. All modern browsers should support it as well, as it uses basic objects - `Date`, `Math` and `Regexp`. As of Internet Explorer, it should work in IE 9 and newer. With some mods (for sure replacing `forEach`) it should work in earlier versions. I wouldn't worry about it, as even some most popular websites dropped support to earlier IE versions. It's compatibile with JavaScript frameworks.

**Please, if you'd test it in other browser, let me know or just edit this readme.**

## Translating
To translate it to your language, you have to change `engNames` object. `week` is an array with weeknames, starting with Sunday, `month` is an array with month names. `suffix` array is used only for `S` and probably it won't be needed in languages other than English

## Coding support
All support is welcomed!

## Todo
* Choosing locale + some translations
* Escaping characters
