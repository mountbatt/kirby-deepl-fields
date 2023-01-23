<?php
Kirby::plugin('mountbatt/deepl', [
    'fields' => [
        'deepl' => [
            'props' => [
                'csrf' => function () {
                    return kirby()->csrf();
                },
                'page_id' => function () {
                    return page()->id();
                },
                'field_name' => function () {
                    return $this->name();
                }
            ]
        ]
    ],
    'api' => [
        'routes' => [
            [
                'pattern' => 'deepl',
                'method' => 'POST',
                'action'  => function () {                   
                    $url = option('mountbatt.deepl.config.api_url');
                    $data = json_decode(file_get_contents("php://input"), true);
                    $options = [
                        'headers' => [
                            'Authorization: DeepL-Auth-Key ' . option('mountbatt.deepl.config.api_key'),
                            'Content-Type: application/x-www-form-urlencoded'
                        ],
                        'method'  => 'POST',
                        'data'    => http_build_query($data)
                    ];
                    $response = Remote::request($url, $options);
                    return $response->content();
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