###Assoterd Commands 
#####(that I have been using for XEN server management and configurations)


**xe host-emergency-ha-disable --force** - To disable HA on the current host (normally used whne for whatebver reason sync has droped between hosts(bad switch in between?))

**xe host-cpu-info** - used to get full list of details of the CPU arch

**xe host-set-cpu-features features=FEATURES** - If we need to *fake* the CPU flags for whatever reason..

**http://SERVERIP/export?uuid=VM_UUID** - quick and easy way to get and export of a *powered off* xen machine

