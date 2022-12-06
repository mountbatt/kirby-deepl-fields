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
                    $options = array(
                        'http' => array(
                        'method' => 'POST',
                        'header' => 
                            "Authorization: DeepL-Auth-Key " . option('mountbatt.deepl.config.api_key') ."\r\n". 
                            'Content-Type: application/x-www-form-urlencoded'."\r\n",
                        'content' => http_build_query(json_decode(file_get_contents("php://input"), true))
                    ));
                    $context = stream_context_create($options);
                    $response = file_get_contents(option('mountbatt.deepl.config.api_url'), false, $context);

                    return $response;                
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