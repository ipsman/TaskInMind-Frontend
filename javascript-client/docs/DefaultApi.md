# ApiTest.DefaultApi

All URIs are relative to *http://localhost:8080/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**helloGet**](DefaultApi.md#helloGet) | **GET** /hello | Returns a greeting



## helloGet

> String helloGet()

Returns a greeting

### Example

```javascript
import ApiTest from 'api_test';

let apiInstance = new ApiTest.DefaultApi();
apiInstance.helloGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

