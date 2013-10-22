# include all services_profile, djangosaml2 and access logs of DEBUG and above
LOGGING['loggers']['services_profile'] = { 'level': 'DEBUG' }
LOGGING['loggers']['djangosaml2'] = { 'level': 'DEBUG' }
LOGGING['loggers']['access'] = { 'level': 'DEBUG' }

# only send critical logs to the console
LOGGING['handlers']['console']['level'] = 'CRITICAL'

# send all logs DEBUG and above to the logfile
LOGGING['handlers']['logfile']['level'] = 'DEBUG'
