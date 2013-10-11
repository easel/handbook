# Scalability Principles

## Cache Management

### Publish to CDN
All frontend assets should be published directly to a CDN. 

### Unique URLs
Frontend assets should be published to the CDN with a unique url. This can easily be constructed from a version number, git sha, or a hash of the files contents. For instance `http://cdn.com/1/main.js` or `http://cdn.com/js/main-abc1234.js`.

### Far-Future Expires
The CDN should serve all assets with expiration date 1 year in the future. This allows the browser to cache assets aggressively. Since every asset is published with a unique URL, cache "busting" will always be handled by requesting a different url entirely.

## Stateless Services
All service API's should be stateless if possible. Don't rely on things like "connections" or "sesions".

## Shared Storage
Do not rely on the local filesystem for anything but intra-request temporary files, which should be created with `tmpfile()`. Instead, use an object storage mechanism such as Amazon S3 or Openstack Swift.

## Asyncronous Processing
For any operation which may take more than a small fraction of a second (100ms or so), seperate it out into an asyncronous *sooner* rather than *later*. Web server and proxy timeouts are fickle, and will cause your reports to fail at the most inopportune times. Designing async in from the beginning eliminates this risk and ensures you don't tie up valuable connection resources waiting on timeouts.
