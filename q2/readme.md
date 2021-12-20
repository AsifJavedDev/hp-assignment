### What do you think is wrong with the code, if anything?
 Developer is calling a third party API in the middleware which may leads to multiple issues.
There is also an issue with response codes. We are returning `500` status code when it should be `404`
 

### Can you see any potential problems that could lead to exceptions

>This is an express middleware it will be called on each requests.
if the third party does not respond in time it will keep on adding the latency. If the third party takes forever to load it may take lot of time. 
> There is also another issue, third party may have rate-limiting which may causes the issues since we are calling APIs inside our middleware.
