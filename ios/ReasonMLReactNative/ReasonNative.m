// ReasonNative.m
#import "bindings.h"
#import "ReasonNative.h"
#import <React/RCTLog.h>

@implementation ReasonNative

extern double fib(int n);
extern TimingResultStruct multiple_values(int n);
extern char * match_string(char * pattern, char * string);
extern void ocaml_init(void);

- (instancetype)init
{
  self = [super init];
  if (self) {
    ocaml_init();
  }
  return self;
}

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(runBenchmark,
                 runBenchmarkWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  //double result;
  TimingResultStruct result;
  
  NSDate *methodStart = [NSDate date];
  result = multiple_values(100000);
  printf("result = %g\n", result.duration);
  printf("friends = %s\n", result.result);
  NSDate *methodFinish = [NSDate date];
  NSTimeInterval executionTime = [methodFinish timeIntervalSinceDate:methodStart];
  resolve(@"");
}

@end
