export declare module AR {

    const CONST : any;

    interface GeoObjectOptions {
        enabled?: boolean;
        renderingOrder?: number;
        drawables?: { cam?: Drawable[], radar?: Drawable2D[], indicator?: Drawable2D[] }
        onEnterFieldOfVision?: () => void;
        onExitFieldOfVision?: () => void;
        onClick?: () => void;
    }

    interface DrawableOptions {
        enabled?: boolean;
        mirrored?: boolean;
        horizontalAnchor?: number;
        verticalAnchor?: number;
        offsetX?: number;
        zOrder?: number;
        rotation?: number;
        scale?: number;
        roll?: number;
        tilt?: number;
        heading?: number;
        opacity?: number;
    }

    interface ImageResourceOptions {
        onLoaded?: () => void;
        onError?: () => void;
    }

    interface ImageDrawableOptions extends DrawableOptions {
        onClick?: () => void;
    }

    interface ActionRangeOptions {
        enabled?: boolean,
        onEnter?: () => boolean,
        onExit?: () => boolean
    }

    interface Curve {
        type?: string,
        amplitude?: number,
        overshoot?: number,
        period?: number
    }

    interface Style {
        backgroundColor?: string;
        fillColor?: string;
        fontStyle?: string;
        outlineColor?: string;
        outlineSize?: number;
        textColor?: string;
    }

    interface Trackable2DObjectOptions {
        enabled: boolean;
        renderingOrder: number;
        onEnterFieldOfVision: () => void;
        onExitFieldOfVision: () => void;
        drawables: { cam: Drawable[] };
        distanceToTarget: { changedThreshold: number, onDistanceChanged: () => void };
        enabledExtendedTracking: boolean;
        extendedTrackingQualityChanged: () => void;
    }

    interface CircleOptions extends ImageDrawableOptions {
        style?: Style;
    }

    interface LabelOptions extends ImageDrawableOptions {
        style?: Style
    }

    interface ModelOptions {
        enabled?: boolean;
        mirrored?: boolean;
        horizontalAnchor?: number;
        rotate?: { roll: number, tilt: number, heading: number };
        scale?: { x: number, y: number, z: number };
        translate?: { x: number, y: number, z: number };
        onClick?: () => void;
        onLoaded?: () => void;
        onError?: () => void;
    }

    interface TrackerOptions {
        physicalTargetImageHeights?: {},
        enabled?: boolean;
        onLoaded?: () => void;
        onError?: () => void;
        onDisabled?: () => void;
    }

    interface HtmlDrawableOptions extends ImageDrawableOptions {
        onLoaded?: () => void,
        onError?: () => void,
        viewportWidth?: number,
        viewportHeight?: number,
        backgroundColor?: string,
        clickThroughEnabled?: boolean,
        allowDocumentLocationChanges?: boolean,
        onDocumentLocationChanged?: () => {};
    }

    interface PositionableOptions {
        enabled?: boolean,
        renderingOrder?: number,
        onEnterFieldOfVision?: () => void,
        onExitFieldOfVision?: () => void,
        onClick?: () => void,
        drawables?: { cam: Drawable[] }
    }

    interface VideoDrawableOptions extends DrawableOptions {
        onFinish?: () => void;
        onLoaded?: () => void;
        onPlaybackStarted?: () => void;
        onFinishedPlaying?: () => void;
        onError?: () => void;
        isTransparent?: boolean;
    }

    class ARchitectObject {
        destroyed: boolean;
        destroy: () => void;
    }

    class BoundingRectangle {
        getHeight: () => number;
        getWidth: () => number;
    }

    class ARObject extends ARchitectObject {
        drawables: { cam: Drawable[] };
        enabled: boolean;
        renderingOrder: number;
    }

    class Location extends ARchitectObject {
        distanceTo: () => number;
        distanceToUser: () => number;
    }

    class RelativeLocation extends Location {
        altitudeDelta: number;
        easting: number;
        location: Location;
        northing: number;

        constructor(location: Location, northing: number, easting: number, altitudeDelta: number);
    }

    class BaseTracker extends ARchitectObject {
        enabled: boolean;
        physicalTargetImageHeights: any;
        src: string;

        isLoaded: () => boolean;
    }

    class GeoLocation extends Location {
        public latitude: number;
        public longitude: number;
        public altitude?: number;

        constructor(latitude: number, longitude: number, altitude?: number);
    }

    class GeoObject extends ARObject {

        drawables: {
            cam: Drawable[],
            indicator: Drawable2D[],
            radar: Drawable2D[],

            addCamDrawable: (drawable: Drawable | Drawable[], position?: number) => void,
            addIndicatorDrawable: (drawable: Drawable2D | Drawable2D[], position?: number) => void,
            addRadarDrawable: (drawable: Drawable2D | Drawable2D[], position?: number) => void,
            removeCamDrawable: (drawableOrPosition: Drawable2D | Drawable2D[] | number) => void,
            removeIndicatorDrawable: (drawableOrPosition: Drawable2D | Drawable2D[] | number) => void,
            removeRadarDrawable: (drawableOrPosition: Drawable2D | Drawable2D[] | number) => void,
        }

        locations: Location[];

        constructor(location: Location[], options?: GeoObjectOptions)
    }

    abstract class Animation extends ARchitectObject {
        isRunning: () => boolean;
        pause: () => void;
        resume: () => void;
        start: (loopTimes?: number) => void;
        stop: () => void;

        onFinish?: () => void;
        onStart?: () => void;
    }

    class AnimationGroup extends Animation {
        constructor(type: "parrarel" | "sequential", animations: Animation[], options?: { onStart?: () => void, onFinish: () => void });
    }

    class Drawable extends ARchitectObject {
        enabled: boolean;
        mirrored: boolean;
        rotate: { roll: number, heading: number, tilt: number };
        onClick: () => void;
    }

    class ImageResource extends ARchitectObject {
        constructor(url: string, options?: ImageResourceOptions)

        getHeight: () => number;
        getUri: () => string;
        getWidth: () => number;
        isLoaded: () => boolean;
    }

    class Drawable2D extends Drawable {
        horizontalAnchor: number;
        offsetX: number;
        offsetY: number;
        opacity: number;
        rotation: number;
        scale: number;
        verticalAnchor: number;
        zOrder: number;

        getBoundingRectangle: () => void;
        onClick: () => void;
    }

    class ImageDrawable extends Drawable2D {
        height: number;
        ImageResource: ImageResource;

        constructor(imageResource: ImageResource, height: number, options?: ImageDrawableOptions);
    }

    class ActionArea extends ARchitectObject {
        isInArea: (geoLocation: GeoLocation) => boolean;
        enabled: boolean;

        /** Events */
        onEnter: () => void;
        onExit: () => void;
    }

    class ActionRange extends ActionArea {
        location: Location;
        radius: number;
        options: ActionRangeOptions;

        constructor(location: Location, radius: number, options: ActionRangeOptions);
    }

    class AnimatedImageDrawable extends ImageDrawable {
        constructor(ImageResource: ImageResource, height: number, keyFrameWidth: number, keyFrameHeight: number, options?: ImageDrawableOptions);

        animate: (keyFrames: number[], duration: number, loopTimes?: number) => void;
        setKeyFrame: (keyFramePos: number) => void;

        onFinish?: () => void;
    }

    class Circle extends Drawable2D {
        radius: number;
        style: { fillColor?: string, outlineSize?: number, outlineColor?: string };

        constructor(radius: number, options?: CircleOptions)
    }

    class ClientTracker extends BaseTracker {
        constructor(src: string, options?: TrackerOptions);
    }

    class CloudTracker extends BaseTracker {
        targetCollectionID: string;
        token: string;

        constructor(token: string, targetCollectionId: string, options?: TrackerOptions);

        /** 
         * @description
         * Starts a single recognition process. 
         * When this function is called, the current camera frame will be send to the wikitude servers and processed. Once the Server finishes his work, the onRecognizedCallback will be called.
         */
        recognize: (
            onRecognizedCallback: (isRecognised: boolean, recognitionData: { targetInfo: any, metadata: any }) => void,
            onErrorCallback: (code: number, errorObject: Error) => void
        ) => void;

        /** 
         * @description
         * Starts a continuous recognition session. 
         * An active continous recognition session will upload a new camera frame to the server in the specified interval.
         */
        startContinuousRecognition: (
            interval: number,
            onRecognizedCallback: (isRecognised: boolean, recognitionData: { targetInfo: any, metadata: any }) => void,
            onErrorCallback: (code: number, errorObject: Error) => void,
            onInterruptionCallback: (suggestedInterval: number) => void
        ) => void;

        stopContinuousRecognition: () => void;


    }


    class HtmlDrawable extends Drawable2D {
        allowDocumentLocationChanges: boolean;
        backgroundColor: string;
        clickThroughEnabled: boolean;
        html: string;
        uri: string;
        viewportHeight: number;
        viewportWidth: number;
        width: number;

        constructor(content: { html?: string, uri?: string }, width: number, options?: HtmlDrawableOptions);

        evalJavaScript: (js: string) => void;
    }


    class Label extends Drawable2D {

        style: {
            backgroundColor?: string,
            textColor?: string,
            fontStyle?: number
        }

        text: string;
        height: string;

        constructor(text: string, height: number, options?: LabelOptions);
    }


    class Model extends Drawable {
        scale: { x: number, y: number, z: number };
        translate: { x: number, y: number, z: number };
        uri: string;


        constructor(uri: string, options: ModelOptions)

        isLoaded: () => boolean;
        onClick: null;
        onLoaded: null;
        onError: null;
    }

    class ModelAnimation extends Animation {
        constructor(model: Model, animationId: string, options?: { onStart: () => void, onFinish: () => void }, duration?: number);
    }


    class Positionable extends ARObject {
        name: string;

        constructor(name: string, options?: PositionableOptions);
    }

    class PropertyAnimation extends Animation {
        constructor(
            target: ARchitectObject,
            property: string,
            start: number,
            end: number,
            duration: number,
            easingCurve?: Curve,
            options?: { onStart?: () => void, onFinish: () => void });
    }

    class Sound extends ARchitectObject {
        constructor(uri: string, options: { onLoaded: () => void, onError: () => void, onFinishedPlaying: () => void });

        load: () => void;
        pause: () => void;
        play: (loopTimes?: number) => void;
        resume: () => void;
        stop: () => void;
    }

    class Trackable2DObject extends ARObject {
        constructor(tracker: ClientTracker, targetName: string, options?: Trackable2DObjectOptions);
    }

    class VideoDrawable extends Drawable2D {

        height: number;

        constructor(uri: string, height: number, options?: VideoDrawableOptions);

        getUri: () => string;
        isTransparent: () => boolean;
        pause: () => void;
        play: (loopTimes?: number) => void;
        resume: () => void;
        stop: () => void;

        onError: null;
        onFinishedPlaying: null;
        onLoaded: null;
        onPlaybackStarted: null;

    }

    const context: {
        clickBehavior: string,
        scene: {
            cullingDistance: number,
            globalScale: number,
            maxScalingDistance: number,
            minScalingDistance: number,
            scalingFactor: number,
            versionNumber: string
        },
        destroyAll: () => void,
        openInBrowser: (url: string, forceNativeBrowser: boolean) => void,
        setCloudRecognitionServerRegion: (
            region: string,
            options?: {
                serverUrl: string,
                onSuccess: () => void,
                onError: () => void
            }) => void,
        startVideoPlayer: (uri: string) => void;
    }

    class hardware {
        camera: {
            enabled: boolean,
            features: {},
            flashlight: boolean,
            flashlightAvailable: boolean,
            focusMode: {},
            position: {},
            zoom: number,
        }

        sensors: {
            enabled: boolean
        }
    }

    class logger {
        activateDebugMode: () => void;
        debug: (message: string) => void;
        error: (message: string) => void;
        info: (message: string) => void;
        warning: (message: string) => void;
    }

    class radar {
        background: ImageResource;
        centerX: number;
        centerY: number;
        container: Element;
        enabled: boolean;
        maxDistance: number;
        northIndicator: { image: ImageResource, radius: number };
        radius: number;

        notifyUpdateRadarPosition: () => void;
    }

}


