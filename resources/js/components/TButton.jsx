import { Link } from "@inertiajs/react";
import React from "react";
/**
 * TButton component for displaying buttons with different styles and colors.
 *
 * @param {string} color - The color of the button (default: "indigo").
 * @param {string} to - The URL to navigate to if the button is a Link.
 * @param {boolean} circle - Whether the button should be displayed as a circle (default: false).
 * @param {string} href - The URL to navigate to if the button is an anchor (a tag).
 * @param {boolean} link - Whether the button should be displayed as a link (default: false).
 * @param {string} target - The target attribute for the anchor link (default: "_blank").
 * @param {function} onClick - The click event handler for the button (default: empty function).
 * @param {ReactNode} children - The content to be displayed inside the button.
 * @returns {JSX.Element} - The rendered button component.
 */
export default function TButton({
  color = "indigo",
  to = "",
  circle = false,
  href = "",
  link = false,
  target = "_blank",
  children,
  onClick = () => {},
}) {
  let classes = [
    "flex",
    "whitespace-nowrap",
    "text-sm",
    "border",
    "border-2",
    "border-transparent",
  ];

  // If the button is a link
  if (link) {
    classes = [...classes, "transition-colors"];

    switch (color) {
      case "indigo":
        classes = [...classes, "text-indigo-500", "focus:border-indigo-500"];
        break;
      case "red":
        classes = [...classes, "text-red-500", "focus:border-red-500"];
        break;
      case "yellow":
        classes = [...classes, "text-yellow-500", "focus:border-yellow-500"];
        break;
        case "green":
        classes = [...classes, "text-green-500", "focus:border-green-500"];
        break;
        case "blue":
        classes = [...classes, "text-blue-500", "focus:border-blue-500"];
        break;
        case "pink":
        classes = [...classes, "text-pink-500", "focus:border-pink-500"];
        break;
    }
  }
  // If the button is not a link (regular button)
  else {
    classes = [...classes, "text-white", "focus:ring-2", "focus-ring-offset-2"];

    switch (color) {
      case "indigo":
        classes = [
          ...classes,
          "bg-indigo-600",
          "hover:bg-indigo-700",
          "focus:ring-indigo-500",
        ];
        break;
      case "red":
        classes = [
          ...classes,
          "bg-red-600",
          "hover:bg-red-700",
          "focus:ring-red-500",
        ];
        break;
      case "green":
        classes = [
          ...classes,
          "bg-emerald-600",
          "hover:bg-emerald-700",
          "focus:ring-emerald-500",
        ];
        break;
      case "yellow":
        classes = [
          ...classes,
          "bg-yellow-500",
          "hover:bg-yellow-600",
          "focus:ring-yellow-400",
        ];
        break;
        case "blue":
        classes = [
          ...classes,
          "bg-blue-500",
          "hover:bg-blue-600",
          "focus:ring-blue-400",
        ];
        break;
        case "pink":
        classes = [
          ...classes,
          "bg-pink-500",
          "hover:bg-pink-600",
          "focus:ring-pink-400",
        ];
        break;
    }
  }

  // If the button should be displayed as a circle
  if (circle) {
    classes = [
      ...classes,
      "h-8",
      "w-8",
      "items-center",
      "justify-center",
      "rounded-full",
      "text-sm",
    ];
  }
  // If the button is not a circle (regular button)
  else {
    classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
  }

  return (
    <>
      {/* Render an anchor (a tag) if href is provided */}
      {href && (
        <Link href={href} className={classes.join(" ")} target={target}>
        {children}
      </Link>

      )}
      {/* Render a Link component if "to" is provided */}
      {to && (
        <Link href={to} className={classes.join(" ")}>
          {children}
        </Link>
      )}
      {/* Render a regular button if neither "to" nor "href" is provided */}
      {!to && !href && (
        <button onClick={onClick} className={classes.join(" ")}>
          {children}
        </button>
      )}
    </>
  );
}
