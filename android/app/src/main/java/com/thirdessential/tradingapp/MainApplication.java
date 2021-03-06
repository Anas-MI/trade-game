package com.thirdessential.tradingapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.reactnativecommunity.art.ARTPackage;
import com.ashideas.rnrangeslider.RangeSliderPackage;
import com.brentvatne.react.ReactVideoPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.horcrux.svg.SvgPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;


//facebook data
// import com.facebook.CallbackManager;
// import com.facebook.FacebookSdk;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
// import com.facebook.appevents.AppEventsLogger;



import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
 // private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  // protected static CallbackManager getCallbackManager() {
  //   return mCallbackManager;
  // }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNCWebViewPackage(),
            new SplashScreenReactPackage(),
            new ARTPackage(),
            new RangeSliderPackage(),
            new ReactVideoPackage(),
//            new LinearGradientPackage(),
//            new OrientationPackage(),
            new VectorIconsPackage(),
            new ReactNativeYouTube(),
            new SvgPackage(),
            new RNGoogleSigninPackage(),
            new SketchCanvasPackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new FBSDKPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
