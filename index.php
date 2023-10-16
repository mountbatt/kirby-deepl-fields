<?php
Kirby::plugin('mountbatt/deepl', [
    'fields' => [
        'deepl' => [
            'props' => [
                'api_key' => function () {
                    return option('mountbatt.deepl.config.api_key');
                },
                'api_url' => function () {
                    return option('mountbatt.deepl.config.api_url');
                },
                'csrf' => function () {
                    return kirby()->csrf();
                },
                'page_id' => function () {
                    return str_replace('/', '+', $this->model()->id());
                },
                'field_name' => function () {
                    return $this->name();
                }
            ]
        ]
    ],
    'translations' => [
        'en' => [
            'mountbatt.deepl.import' => 'Import from',
            'mountbatt.deepl.translatenow' => "Translate now with DeepL",
            'mountbatt.deepl.importhelp' => "Loads the value of the field from the original language"
        ],
        'de' => [
            'mountbatt.deepl.import' => 'Importiere von',
            'mountbatt.deepl.translatenow' => "Übersetze jetzt mit DeepL",
            'mountbatt.deepl.importhelp' => "Lädt den Wert des Feldes aus der Originalsprache"
        ]
    ]
]);
