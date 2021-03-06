/*
 * MACHINE GENERATED, DO NOT EDIT
 * GENERATED BY node-vulkan v0.0.1
 */
#ifndef __VK_VKCLEARCOLORVALUE_H__
#define __VK_VKCLEARCOLORVALUE_H__

#include <nan.h>

#define GLFW_INCLUDE_VULKAN
#include <GLFW/glfw3.h>

class _VkClearColorValue: public Nan::ObjectWrap {

  public:
    // #methods
    static NAN_METHOD(New);
    // #accessors
    Nan::Persistent<v8::Array, v8::CopyablePersistentTraits<v8::Array>> float32;
    static NAN_GETTER(Getfloat32);
    static NAN_SETTER(Setfloat32);
    
    Nan::Persistent<v8::Array, v8::CopyablePersistentTraits<v8::Array>> int32;
    static NAN_GETTER(Getint32);
    static NAN_SETTER(Setint32);
    
    Nan::Persistent<v8::Array, v8::CopyablePersistentTraits<v8::Array>> uint32;
    static NAN_GETTER(Getuint32);
    static NAN_SETTER(Setuint32);
    

    // real instance
    VkClearColorValue instance = {};

    static Nan::Persistent<v8::FunctionTemplate> constructor;
    static void Initialize(v8::Local<v8::Object> exports);

  private:
    _VkClearColorValue();
    ~_VkClearColorValue();

};

#endif