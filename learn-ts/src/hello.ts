interface A {

    return(x:boolean):string;

}


let x:A|null|undefined = undefined;

console.log(typeof x);

type  X = Exclude<string, number>


