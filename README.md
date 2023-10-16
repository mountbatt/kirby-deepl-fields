# Kirby DeepL Fields

[Kirby](https://getkirby.com) plugin to translate input and textarea fields with DeepL (Free & Pro API).

**Features:**
 - Detects base language of your Site and offers translation button to translate the field content
 - Can import the field value from the base language
 - Can be used with DeepL Free and Pro API
 - Supports input field and textarea right now
 - Keeps all formattings of a textarea field. Even HTML-Tags
 

https://user-images.githubusercontent.com/2411246/200800227-e2336667-8564-47f3-9084-aa6640da5471.mp4


## Installation

This plugin requires PHP 8.0 and Kirby 3.6.0 or higher.

Download and copy this repository to ```/site/plugins/kirby-deepl-fields```

Alternatively, you can install it with composer: ```composer require mountbatt/kirby-deepl-fields```


## Setup

### Fields

This field can replace any `text` and `textarea` field you have set up, and works out of the box with as little config as:

Textarea:
```yaml
editor:
  label: My translatable Field
  inputtype: textarea
  size: large
  type: deepl
```

Text Input:
```yaml
editor:
  label: My translatable Field
  inputtype: text
  type: deepl
```

### DeepL API in `site/config/config.php`

First you have to register at DeepL to get an API-Key here: 
https://www.deepl.com/en/pro-api

You can decide if you want to use the free API or buy a PRO plan. Both works and depends on your quota.

After registration you get the API-Key and the API-URL. Copy those values in the config.php setting.

The free-API URL is at the moment: `https://api-free.deepl.com/v2/translate`


````
<?php
return [
    mountbatt.deepl.config' => [
        'api_key' => '<your-api-key>',
        'api_url' => '<your-deepl-api-url>'
    ]
]
````

## Options

### Available options

| Option     | Type   | Required | Default                | Description                                                 |
|:-----------|:-------|:---------|:-----------------------|:------------------------------------------------------------|
| inputtype  | String | `true`   | -                      | can be `text` and `textarea`                                |
| size       | String | `false`  | -                      | If `textarea` you can set `small`, `medium`, `large`, `huge`|

## License

MIT

