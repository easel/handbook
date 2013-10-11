# REST API Conventions

Much of the beauty of the increasingly popular REST API paradigm lies in it's simplicity and the freedom to innovate. However, particularly inside a single codebase, not having established conventions starts to add unnecessary overhead.

## Assumptions

* Remain close to RESTful API design patterns and best practices
* Prioritize elegant functionality for JS- and JSON-based clients (deviate from RESTful API design dictates where necessary)
    * All functionality should degrade to POST and GET for XHR support
    * Results should return an envelope since XHR does not handle HTTP headers well
* All results are paginated

## Query String Parameters

The following query string parameters should remain consistent across APIs.

    ?q=querystring // Query String supplied by user
    &start=1 // Record ordinal (integer) to begin results return
    &end=100 // Record ordinal (integer) to end results return
    &page=2 // Page ordinal (integer) to return in results
    &per_page=20 // Per page count (integer) for pagination
    &depth=1 // Depth of related resources to flatten into results return

## Data Envelope Formatting
Resource calls should return the following data envelopes for easy use in
JS-based clients.


    {
        'meta': {
            'status_code': 200, // HTTP status code
            'start': 1,
            'end': 2,
            'page': 2
            'per_page': 20,
            'pages': 5,
            'depth': 1,
            'form_errors': [
                    {
                        'name': 'Field Required',
                        'message': 'The XXXX field is required.'
                    },
                    {
                        name: 'Invalid Data',
                        message: 'Format date in YYYY-MM-DD style.'
                    }
                ],
            'error_code': null // HTTP error code or else NULL,
            'error_message': 'Error message'
            }
        },
        data: {
            resource_id: 1,
            resource_uri: '/resources/2/',

            ... additional metadata ...

            related_resource: { // NOTE: All related resource info is represented as dictionary
                resource_id: 2,
                resource_uri: '/resources/2/'
            }
        }
    }
