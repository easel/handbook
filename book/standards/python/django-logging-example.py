LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(process)d %(thread)d %(name)s.%(module)s:%(lineno)d %(message)s'
        },
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'django.utils.log.NullHandler',
        },
        'console': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'logfile': {  # define and name a handler
            'level': 'INFO',
            'class': 'logging.FileHandler',  # set the logging class to log to a file
            'formatter': 'verbose',  # define the formatter to associate
            'filename': os.path.join(PROJECT_ROOT, 'var', 'log', 'profile.log')  # log file
        },
        'access_log': {
            'level': 'INFO',
            'class': 'logging.FileHandler',  # set the logging class to log to a file
            'formatter': 'verbose',          # define the formatter to associate
            'filename': os.path.join(PROJECT_ROOT, 'var', 'log', 'profile-access.log')  # log file
        }
    },
    # when not otherwise defined, send logs to the console and the logfile and include INFO and above.
    'root': {
        'handlers': ['console', 'logfile'],
        'propagate': True,
        'level': 'INFO',
    },

    'loggers': {

        # send access logs only to the access_log, only including info and above.
        'access': {
            'level': 'INFO',
            'handlers': ['access_log',],
        },

        # only include django logs of warning and above
        'django': {'level': 'WARNING'},

        # only include south logs of warning and above
        'south.generic': {'level': 'WARNING'},
    }
}
