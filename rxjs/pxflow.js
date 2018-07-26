class PxFlow {
  constructor() {
    this.stack = new Array();
  }

  add(pxJob) {
    pxMountPoint.reply().subscribe(
      (data) => {
        let mountpoint = this.stack.pop();
        mountpoint.tasks().next(data);    
      },
      (err) => {
      }  
    );
    this.stack.push(pxMountPoint);
  }

  execute(data) {
    let mountpoint = this.stack.pop();
    mountpoint.tasks().next(data);
  }
}

j.add(pxRegistry.get('"AWS::CF::Component-1'));
j.add(pxRegistry.get('"AWS::CF::Component-2'));
