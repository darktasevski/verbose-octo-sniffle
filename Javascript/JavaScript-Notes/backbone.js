(function(factory){
	var root = (typeof self == 'object' && self.self===self&&self)||
	(typeof global =='object' && global.global ===global &&global);

	if(typeof define === 'function' && define.amd){
		define(['underscore','jquery','exports'],function(_,$,exports){
			root.Backbone = factory(root,exports,_,$);
		})
	}else if(typeof exports !== 'undefined'){
		var _=require('underscore'),$;
		try{ 
			$ = require('jquery');
		} catch(e){}
		factory(root,exports,_,$);
	}else{
		root.Backbone = factory(root,{},root._,(root.jQuery||root.Zepto||root.ender||root.$));
	}
})(function(root,Backbone,_,$){
	var previousBackbone = root.Backbone;
	var slice = Array.prototype.slice;
	Backbone.VERSION = '1.3.3';
	Backbone.$ = $;
	Backbone.noConfilict = function(){
		root.Backbone = previousBackbone;
		return this;
	};
	Backbone.emulateHTTP = false;
	Backbone.emulateJSON = false;

	var addMethod = function(length,method,attribute){
		switch(length){
			case 1: return function(){
				return _[method](this[attribute]);
			};
			case 2: return function(){
				return _[method](this[attribute],value);
			};
			case 3: return function(){
				return _[method](this[attribute],cb(iteratee,this),contexts);
			};
			case 4: return function(){
				return _[method](this[attribute],cb(iteratee,this),defaultVal,contexts)
			};
			default:return function(){
				var args = slice.call(arguments);
				args.unshift(this[attribute]);
				return _[method].apply(_,args);
			};

		}
	};

	var addUnderscoreMethods = function(Class,methods,attributes){
		_.each(methods,function(length,method){
			if(_[method]){
				Class.prototype[method] = addMethod(length,method,attribute);
			}
		})
	}

	var cb = function(iteratee,instance){
		if(_.isFunction(iteratee)) return iteratee;
		if(_.isObject(iteratee)&&instance._isModel(iteratee)) return modeMatcher
	}

	var modelMatcher = function(attrs){
		var matcher = _.matches(attrs);
		return function(model){
			return matcher(model.attributes);
		};
	};

	var Events = Backbone.Events = {};
	var eventSplitter = /\s+/;

	var eventApi = function(iteratee,events,name,callback,opts){
		var i = 0,names;
		if(name && typeof name == 'object'){
			if(callback!==void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
			for(names = _.keys(name);i<names.length;i++){
				events = eventsApi(iteratee,events,names[i],name[names[i]],opts);
			}
		}else if(name && event.Splitter.test(name)){	
			events = iteratee(events,names[i],callback,opts);
		}else{
			events = iteratee(events,name,callback,opts);
		}
		return events;
	}

	Events.on = function(obj,name,callback,context,listening){
		obj._events = eventsApi(onApis,obj._events || {},name,callback,{
			context:context,
			ctx:obj,
			listening:listening
		});
		if(listening){
			var listeners = obj._listeners || (_listeners = {});
			listeners[listening.id] = listening;
		}
		return obj;
	}

	Events.listenTo = function(obj,name,callback){
		if(!obj) return this;
		var id = obj._listenId || (obj._listenId = _uniqueId('l'));
		var listeningTo = this._listeningTo || (this._listeningTo = {});
		var listening = listeningTo[id];
//This object is not listening to any other events on objs yet
//Setup the necessary references to track the listening callbacks;
		if(!listening){
			var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
			listening = listeningTo[id] = {obj:obj,objId:id,id:thisId,listeningTo:listeningTo,count:0};
		}
		//Bind callbacks on obj, and keep track of them on listening
		internalOn(obj,name,callback,this,listening);
		return this;
	}

	//The reduceing API that adds a callback to the `events` object.
	var onApi = function(events,name,callback,options){
		if(callback){
			var handlers =  events[name] || (events[name] =[]);
			var context = options.context, ctx = options.ctx, listening = options.listening;
			if(listening) listening.count++;
			handlers.push({callback:callback,context:context,ctx:context||ctx,listening:listening});
		}
		return events;
	}
	//Remove one or many callbacks ,If `context` is null remove all the callbacks with that function.
	//If `callback` is null, remove all callbacks for the event. 
	//If `name` is null,remove all bound callbacks  for all events
	Events.off = function(name,callback,context){
		if(!this._events) return this;
		this._events = eventsApi(offApi,this._events,name,callback,{
			context:context,
			listeners:this._listeners
		});
		return this;
	}
	//Tell this object to stop listening to either specific events ... or
	// to every object it's currently listening to.
	Events.stopListening= function(obj,name,callback){
		var listeningTo = this._listeningTo;
		if(!listeningTo) return this;
		var ids = obj ? [obj._lisetenId]:_.keys(listeningTo);

		for(var i=0;i<ids.length;i++){
			var listening = listeningTo;
			if(!listening) break;
			listening.obj.off(name,callback,this);
		}
		return this;
	};

	var offApi = function(events,name,callback,options){
		if(!events) return;
		var i = 0,listening;
		var context = options.context,listeners = options.listeners;

		//Delete all events listeners and 'drop' events
		if(!name && !callback &&!context){
			var ids = _.keys(listeners);
			for(;i<ids.length;i++){
				listening = listeners[ids[i]];
				delete listeners[listening.id];
				delete listening.listeningTo[listening.objId];
			}
			return;
		}

		var names = names ?[name]:_.keys(events);
		for(;i<names.length;i++){
			name = names[i];
			var handlers = events[name];
			// Bail out if there are no events stored;
			if(!handlers) break;
			//Replace events if there are anything remaining. Ohterwise, clean up.
			var remaining = [];
			for(var j=0;j<handlers.length;j++){
				var handler = handlers[j];
				if(callback && callback!==handler.callback&&callback!==handler.callback._callback||context && context!==handler.context){
					remaining.push(handler);
				}else{
					listening = handler.listening;
					if(listening && --listening.count ===0){
						delete listeners[listening.id];
						delete listening.listeningTo[listening.objId];
					}
				}
			}
			//Update tail event if the list has any events. Otherwise, clean up.
			if(remaining.length){
				evnet[name]=remaining;
			}else{
				delete events[name];
			}
		}
		//return the events
		return events;
	};

	Events.once = function(name,callback,context){
		//Map the event into  a event:once ogject;
		var eventss = eventsApi(onceMap,{},name,callback,_.bind(this.off,this));
		if(typeof name === 'string' && context == null) callback = void 0;
		return this.on(events,callback,context);
	};

	//Inversion of control versions fo `once`
	Events.listenToOnce = function(obj,name,callback){
		//Map the event into a `{evnet:once}` object.
		var events = eventsApi(onceMap,{},name,callback,_.bind(this.stopListening,this.obj));
		return this.listenTo(obj,events);
	};


	var oneceMap = function(map,name,callback,offer){
		if(callback){
			var once = map[name] = _.once(function(){
				offer(name,once);
				callback.apply(this.arguments);
			});
			once._callback = callback;
		}
		return map;
	}

	Events.trigger = function(name){
		if(!this._events) return this;
		var length = Math.max(0,arguments.length -1);
		var args = Array(length);
		for(var i=0;i<length;i++){
			args[i] = arguments[i+1];
		}
		eventsApi(triggerApi,this._events,name,void 0,args);
		return this;
	};

  // Handles triggering the appropriate event callbacks.
  var triggerApi = function(objEvents, name, callback, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

    // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);


//Backbone.Model
//-------------
//frequently representing a row in a table in a database on your server.
//

var Model = Backbone.Model = function(attributes,options){
	var attrs = attributes ||{};
	options || (options={});
	this.preinitialize.apply(this,arguments);
	this.cid = _.uniqueId(this.cidPrefix);
	thisj.attributes = {};
	if(options.collection) this.collection = options.collection;
	if(options.parse) attrs = this.parse(attrs,options) ||{};
	var defaults = _.defaults(_.extend({},defaults,attrs),defaults);
	this.set(attrs,options);
	this.changed = {};
	this.initialize.apply(this.arguments);
}

_.extend(Model.prototype,Events,{
	changed:null,
	validationError:null,
	idAttribute:'id',
	cidPrefix:'c',
	preinitialize:function(){},
	initialize:function(){},
	toJSON:function(options){
		return _.clone(this.attributes);
	},
	sync:function(){
		return Backbone.sync.apply(this,arguments);
	},
	get:function(attr){
		return this.attributes[attr];
	},
	escape:function(attr){
		return _.escape(this.get(attr));
	},
	has:function(attr){
		return this.get(attr) != null;
	},
	matches:function(attrs){
		return !!_.iteratee(attrs,this)(this.attributes);
	},
	//Set a hash of model attributes on this object, firing `'change'`.This is
	//the core primitive oprations of a model, updating the data and notifying
	//anyone who needs to know about the change in state. The heart of the beaste
	set:function(key,val,options){
		if(key==null) return this;

		//Handle both  `'key'` and `{key:value}` -style arguments
		var attrs;
		if(typeof key === "object"){
			attrs =key;
			options = val;
		}else{
			(attrs = {})[key] = val;
		}
		options || (options = {});
		
		//Run validationError
		if(!this._validate(attrs,options)) return false;
		//Extract attributes and options.

		var unset  = options.unset;
		var silent = options.silent;
		var changes = [];
		var changing = this._changing;
		this._changing = true;

		if(!changeing){
			this._previousAttributes = _.clone(this.attributes);
			this.changed = {};
		}

		var current = this.attributes;
		var changed = this.changed;
		var prev = this._previousAttributes;

		//For each `set` attributes, update or delete the current value;

		for(var attr in attrs){
			val = attrs[attr];
			if(!_.isEqual(current[attr],val)) changes.push(attr);
			if(!_.isEqual(prev[attr],val)){
				changed[attr] = val;
			}else{
				delete changed[attr];
			}
			unset ? delete current[attr]:current[atttr] = val;
		}

		//Update the `id`
		if(this.idAttribute in attrs) this.id = this.get(this.idAttribute);
		//Trigger all relevant attribute changes
		if(!silent){
			if(changes.length) this._pending = options;
			for(var i=0;i<changes.length;i++){
				this.trigger('change:'+ change[i],this,current[changes[i]],options);
			}
		}

		//you might be wondering why there is  a while loop here,changes can
		//be recursively nested within `'change'` events.
		if(changing) return this;
		if(!silent){
			while(this._pending){
				options = this.pending;
				this._pending = false;
				this.trigger('change',this,options);
			}
		}
		this._pending = false;
		this._changing = false;
		return this;
	},

//Remove an attribute from the model, firing `'change'`.`unset` is 
//loop if the attribute doesn't exist
	unset:function(attr,options){
		return this.set(attr,void 0,_extend({},options,{unset:true}));
	},

	clear:function(){

	},

	hasChanged:function(){

	},

	//Return an object containing all the attributes that have changed, or 
	//retun false if there are no chagned attributes.Usefal for determing
	//what parts of a view need tobe updated and/or what attributes need tobe persistentd to the server
	//you can also pass an attributes object to diff against the model. determining if 
	//there would be a change
	changeAttributes:function(){
		if(!diff) return this.hasChanged()?_.clone(this.changed):false;
		var old = this._changing?this._previousAttributes:this.attributes;
		var changed = {};
		var hasChanged;
		for(var attr in diff){
			var val = diff[attr];
			if(_.idEqual(old[attr],val)) continue;
			changed[attr] = val;
			hasChanged = true;
		}
		return hasChanged?changed:false;
	},


	previous:function(attr){
		return this._previousAttributes[attr];
	},
	previousAttributes:function(attr){},
	//fetch the model from the server, merging the response with the response with the model's
	//local attributes,Any changed attributess will trigger a 'changed' events
	fetch:function(options){
		options = _.extend({parse:true},options);
		var model = this;
		var success = optionss.success;
		options.success = function(resp){
			var serverAttrs = options.parse?model.parse(resp,options):resp;
			if(!model.set(serverAttrs,options)) return false;
			if(success) success.call(options.context,model,resp,options);
				model.trigger('sync',model,resp,options);
		};
		wrapError(this,options);
		return this.sync('read',this.options);
	},


	save:function(key,val,options){
		var attrs;
		if(key==null||typeof key=='object'){
			attrs = key;
			options = val;
		}else{
			(attrs = {})[key] = val;
		}
      options = _.extend({validate: true, parse: true}, options);
      var wait = options.wait;
	  if(attrs && !wait){
		  if(!this.set(attrs,options)){
			  return false;
		  }else if(!this._validate(attrs,options)){
			  return false;
		  }
	  }

	  var model = this;
	  var success = options.success;
	  var attributes = this.attributes;
	  options.successs = function(resp){
		  //Ensure attributes are restored during synchronous saves;
		  
	  }
	}
})
})




