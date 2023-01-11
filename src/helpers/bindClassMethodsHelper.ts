function getClassProperties(obj: any) {
  const props = new Set<[any, string | symbol]>();

  do {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop of Reflect.ownKeys(obj)) {
      props.add([obj, prop]);
    }
  } while (obj === Reflect.getPrototypeOf(obj) && obj !== Object.prototype);

  return props;
}

function isValidProp(key: string, include: string[] = []) {
  if (!include.length) {
    return true;
  }

  return include.some((prop) => prop === key);
}

export function bindClassMethods(ctx: any, ...methods: string[]) {
  const props = getClassProperties(ctx.constructor.prototype);

  // eslint-disable-next-line no-restricted-syntax
  for (const [obj, prop] of props) {
    // Omit properties that are not in the list of methods to bind
    const isValidProperty = isValidProp(prop as string, methods as string[]);

    // Omit constructor
    if (prop === "constructor" || !isValidProperty) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const descriptor = Reflect.getOwnPropertyDescriptor(obj, prop);

    // Verify if is a function
    if (descriptor && typeof descriptor.value === "function") {
      // Bind method to class
      ctx[prop] = ctx[prop].bind(ctx);
    }
  }
}
