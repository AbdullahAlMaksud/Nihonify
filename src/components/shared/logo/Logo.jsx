import { Diameter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className="">
          <Link
            to={"/"}
            className="flex justify-between items-center gap-2 leading-none text-secondary-foreground"
          >
            <Diameter className="size-8 font-bold text-secondary p-0.5 bg-primary rounded-full" />{" "}
            <span className="text-2xl font-bold">Nihonify</span>
          </Link>
        </div>
    );
};

export default Logo;